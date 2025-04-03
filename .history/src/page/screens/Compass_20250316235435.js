import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";

const COMPASS_SIZE = 400;
const CENTER = 200; // Điều chỉnh lại từ 100 thành 200 để khớp với kích thước SVG
const RADIUS = 180; // Điều chỉnh từ 90 thành 180 để phù hợp với COMPASS_SIZE

const Compass = () => {
  const lastDirection = useRef(0);
  const [direction, setDirection] = useState(0); // Khởi tạo là 0 thay vì 220
  const rotate = useSharedValue(0); // Giá trị ban đầu là 0
  const [angle, setAngle] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const lastLocation = useRef(null);
  const subscriptionRef = useRef(null);

  // **Lấy dữ liệu vị trí**
  useEffect(() => {
    const startWatching = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Bạn chưa cấp quyền truy cập vị trí!");
        return;
      }

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Cập nhật mỗi 1 giây
          distanceInterval: 5, // Cập nhật khi di chuyển 5 mét
        },
        (loc) => {
          const newCoords = loc.coords;
          if (lastLocation.current) {
            const distance = calculateDistance(
              lastLocation.current.latitude,
              lastLocation.current.longitude,
              newCoords.latitude,
              newCoords.longitude
            );
            if (distance < 5) return; // Bỏ qua nếu khoảng cách nhỏ hơn 5 mét
          }
          setLocation(newCoords);
          lastLocation.current = newCoords;
        }
      );
    };

    startWatching();

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.remove();
    };
  }, []);

  // **Hàm tính khoảng cách giữa hai tọa độ**
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Bán kính Trái Đất (mét)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách tính bằng mét
  };

  // **Lấy dữ liệu từ cảm biến từ trường**
  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let { x, y } = data;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI);
      newAngle = (newAngle + 360) % 360; // Chuẩn hóa góc từ 0-360
      setAngle(Math.round(newAngle));
    });
    Magnetometer.setUpdateInterval(100); // Cập nhật mỗi 100ms
    return () => subscription && subscription.remove();
  }, []);

  // **Cập nhật góc xoay của la bàn**
  useEffect(() => {
    const newDirection = angle; // Không cần cộng thêm 90, vì góc từ Magnetometer đã đủ
    const currentDirection = rotate.value % 360;
    let delta = newDirection - currentDirection;

    if (delta > 180) delta -= 360; // Điều chỉnh delta để xoay ngắn nhất
    else if (delta < -180) delta += 360;

    const finalDirection = currentDirection + delta;

    if (Math.abs(finalDirection - lastDirection.current) > 1) {
      // Giảm rung
      lastDirection.current = finalDirection;
      setDirection(finalDirection);
      rotate.value = withTiming(finalDirection, { duration: 200 }); // Xoay mượt mà
    }
  }, [angle]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotate.value}deg` }], // Xoay ngược để N hướng Bắc
  }));

  return (
    <View style={styles.all}>
      <View style={styles.container}>
        <Animated.View style={[animatedStyle]}>
          <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} viewBox="0 0 400 400">
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="white"
              strokeWidth="2"
              fill="black"
            />
            {Array.from({ length: 12 }).map((_, i) => {
              // Chỉ vẽ các mốc 30°
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              const x1 = CENTER + RADIUS * Math.cos(rad);
              const y1 = CENTER + RADIUS * Math.sin(rad);
              const x2 = CENTER + (RADIUS - 10) * Math.cos(rad);
              const y2 = CENTER + (RADIUS - 10) * Math.sin(rad);
              const textX = CENTER + (RADIUS - 20) * Math.cos(rad);
              const textY = CENTER + (RADIUS - 20) * Math.sin(rad);

              return (
                <React.Fragment key={i}>
                  <Line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <SvgText
                    x={textX}
                    y={textY}
                    fontSize="14"
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {deg}°
                  </SvgText>
                </React.Fragment>
              );
            })}
            {/* Các hướng chính */}
            <SvgText
              x={CENTER}
              y={CENTER - RADIUS + 30}
              fill="red"
              fontSize="20"
              textAnchor="middle"
            >
              N
            </SvgText>
            <SvgText
              x={CENTER + RADIUS - 30}
              y={CENTER}
              fill="white"
              fontSize="20"
              textAnchor="middle"
            >
              E
            </SvgText>
            <SvgText
              x={CENTER}
              y={CENTER + RADIUS - 30}
              fill="white"
              fontSize="20"
              textAnchor="middle"
            >
              S
            </SvgText>
            <SvgText
              x={CENTER - RADIUS + 30}
              y={CENTER}
              fill="white"
              fontSize="20"
              textAnchor="middle"
            >
              W
            </SvgText>
          </Svg>
        </Animated.View>

        {/* Kim cố định */}
        <View style={styles.needleContainer}>
          <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} viewBox="0 0 400 400">
            <Line
              x1={CENTER}
              y1={CENTER - 100}
              x2={CENTER}
              y2={CENTER + 100}
              stroke="red"
              strokeWidth="4"
            />
          </Svg>
        </View>
      </View>

      <Text style={styles.angleText}>{Math.round(angle)}°</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>📍 Vị trí hiện tại:</Text>
        {location ? (
          <Text style={styles.locationText}>
            Latitude: {location.latitude ? location.latitude.toFixed(4) : "N/A"}
            {"\n"}
            Longitude:{" "}
            {location.longitude ? location.longitude.toFixed(4) : "N/A"}
            {"\n"}
            Hướng: {Math.round(angle)}°
          </Text>
        ) : (
          <Text style={styles.locationText}>
            {errorMsg || "Đang lấy vị trí..."}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  needleContainer: {
    position: "absolute",
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  angleText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  locationContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#222",
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  locationText: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});

export default Compass;

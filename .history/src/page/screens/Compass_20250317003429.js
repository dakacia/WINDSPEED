import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";

const COMPASS_SIZE = 400;
const CENTER = 100;
const RADIUS = 90;

const Compass = () => {
  const lastDirection = useRef(0);
  const [direction, setDirection] = useState(220);
  const rotate = useSharedValue(220);
  const [angle, setAngle] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const lastLocation = useRef(null);
  const subscriptionRef = useRef(null);
  const angleHistory = useRef([]); // Lưu trữ lịch sử góc để làm mượt

  // Hàm chuẩn hóa góc (luôn trả về giá trị trong khoảng 0-360)
  const normalizeAngle = (angle) => {
    return ((angle % 360) + 360) % 360;
  };

  // Hàm tính khoảng cách ngắn nhất giữa hai góc
  const getShortestDelta = (from, to) => {
    const delta = ((to - from + 180) % 360) - 180;
    return delta <= -180 ? delta + 360 : delta;
  };

  // Hàm tính khoảng cách
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Lấy dữ liệu vị trí
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
          timeInterval: 1000,
          distanceInterval: 5,
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

            if (distance < 5) {
              return;
            }
          }

          setLocation(newCoords);
          lastLocation.current = newCoords;
        }
      );
    };

    startWatching();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  // Lấy dữ liệu hướng từ Magnetometer và làm mượt
  useEffect(() => {
    let subscription = Magnetometer.addListener((data) => {
      let { x, y } = data;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI);
      newAngle = (newAngle + 268 + 360) % 360;

      // Làm mượt bằng trung bình động
      angleHistory.current.push(newAngle);
      if (angleHistory.current.length > 5) {
        angleHistory.current.shift();
      }
      const smoothedAngle =
        angleHistory.current.reduce((a, b) => a + b, 0) /
        angleHistory.current.length;

      setAngle(Math.round(smoothedAngle));
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  // Cập nhật hướng la bàn
  useEffect(() => {
    const newDirection = normalizeAngle(angle + 90);
    const currentDirection = normalizeAngle(rotate.value);

    // Xử lý riêng trường hợp ranh giới 0°/360°
    let delta;

    // Trường hợp 1: Từ góc nhỏ (gần 0°) đến góc lớn (gần 360°)
    if (currentDirection <= 45 && newDirection >= 315) {
      delta = -(360 - newDirection + currentDirection); // Quay ngược chiều kim đồng hồ
    }
    // Trường hợp 2: Từ góc lớn (gần 360°) đến góc nhỏ (gần 0°)
    else if (currentDirection >= 315 && newDirection <= 45) {
      delta = newDirection + (360 - currentDirection); // Quay theo chiều kim đồng hồ
    }
    // Trường hợp thông thường: Tính delta ngắn nhất
    else {
      delta = getShortestDelta(currentDirection, newDirection);
    }

    const finalDirection = normalizeAngle(currentDirection + delta);

    // Chỉ cập nhật khi thay đổi đáng kể
    if (Math.abs(finalDirection - lastDirection.current) > 1) {
      lastDirection.current = finalDirection;
      setDirection(finalDirection);
      rotate.value = finalDirection; // Trực tiếp gán giá trị để tránh giật
      rotate.value = withSpring(finalDirection, {
        damping: 20,
        stiffness: 100,
        mass: 1,
      });
    }
  }, [angle]);

  // Style động cho la bàn
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotate.value}deg` }],
  }));

  return (
    <View style={styles.all}>
      <View style={styles.container}>
        <Animated.View style={[animatedStyle]}>
          <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} viewBox="0 0 200 200">
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke="white"
              strokeWidth="0"
              fill="black"
            />
            {Array.from({ length: 360 }).map((_, i) => {
              const rad = (i * Math.PI) / 180;
              const x1 = CENTER + RADIUS * Math.cos(rad);
              const y1 = CENTER + RADIUS * Math.sin(rad);
              const x2 =
                CENTER + (RADIUS - (i % 30 === 0 ? 10 : 5)) * Math.cos(rad);
              const y2 =
                CENTER + (RADIUS - (i % 30 === 0 ? 10 : 5)) * Math.sin(rad);
              const textX = CENTER + (RADIUS - 20) * Math.cos(rad);
              const textY = CENTER + (RADIUS - 20) * Math.sin(rad);

              return (
                <React.Fragment key={i}>
                  <Line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i === 0 ? "red" : "white"}
                    strokeWidth={i % 30 === 0 ? 1.5 : 0.5}
                  />
                  {i % 30 === 0 && (
                    <SvgText
                      x={textX}
                      y={textY}
                      fontSize={10}
                      fill="white"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {i}°
                    </SvgText>
                  )}
                </React.Fragment>
              );
            })}
            <SvgText x="95" y="20" fill="white" fontSize="16" fontWeight="bold">
              T
            </SvgText>
            <SvgText
              x="95"
              y="185"
              fill="white"
              fontSize="16"
              fontWeight="bold"
            >
              Đ
            </SvgText>
            <SvgText
              x="175"
              y="105"
              fill="white"
              fontSize="16"
              fontWeight="bold"
            >
              B
            </SvgText>
            <SvgText
              x="15"
              y="105"
              fill="white"
              fontSize="16"
              fontWeight="bold"
            >
              N
            </SvgText>
          </Svg>
        </Animated.View>

        <View style={styles.needleContainer}>
          <Svg width="400" height="400" viewBox="0 0 400 400">
            <Line
              x1="200"
              y1="10"
              x2="200"
              y2="68"
              stroke="red"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="200"
              y1="120"
              x2="200"
              y2="280"
              stroke="white"
              strokeWidth="1"
            />
            <Line
              x1="110"
              y1="200"
              x2="280"
              y2="200"
              stroke="white"
              strokeWidth="1"
            />
          </Svg>
        </View>
      </View>

      <Text style={styles.angleText}>{Math.round(angle)}°</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>📍 Vị trí hiện tại:</Text>
        {location ? (
          <Text style={styles.locationText}>
            Latitude: {location.latitude}
            {"\n"}
            Longitude: {location.longitude.toFixed(4)}
            {"\n"}
            <Text>Hướng: {angle}°</Text>
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
    width: 400,
    height: 400,
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
    textAlign: "center",
  },
});

export default Compass;

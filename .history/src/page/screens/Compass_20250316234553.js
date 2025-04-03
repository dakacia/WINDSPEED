import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";

export default function Compass() {
  const [heading, setHeading] = useState(0); // Góc xoay của thiết bị (hướng đi)
  const [compassRotation, setCompassRotation] = useState(0); // Góc xoay của vòng tròn (ngược lại để giữ N chỉ Bắc)
  const [latitude, setLatitude] = useState(null); // Vĩ độ
  const [longitude, setLongitude] = useState(null); // Kinh độ
  const [isAvailable, setIsAvailable] = useState(false);
  const headingHistoryRef = useRef([]);

  useEffect(() => {
    // Kiểm tra quyền truy cập vị trí
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Quyền truy cập vị trí bị từ chối");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();

    // Kiểm tra và thiết lập cảm biến từ trường
    Magnetometer.isAvailableAsync().then((result) => {
      setIsAvailable(result);
      if (result) {
        const subscription = Magnetometer.addListener((data) => {
          const { x, y } = data;
          let angle = Math.atan2(y, x) * (180 / Math.PI);
          angle = angle >= 0 ? angle : angle + 360; // Góc từ 0-360 độ

          // Làm mượt bằng trung bình 5 giá trị gần nhất
          headingHistoryRef.current = [
            ...headingHistoryRef.current,
            angle,
          ].slice(-5);
          const average =
            headingHistoryRef.current.reduce((sum, val) => sum + val, 0) /
            headingHistoryRef.current.length;
          setHeading(average); // Cập nhật hướng đi của thiết bị
          setCompassRotation(-average); // Vòng tròn xoay ngược để giữ N chỉ Bắc
        });

        Magnetometer.setUpdateInterval(100);
        return () => subscription.remove();
      }
    });
  }, []);

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text>La bàn không khả dụng trên thiết bị này.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Vòng tròn la bàn với các mốc và hướng */}
      <View
        style={[
          styles.compassContainer,
          { transform: [{ rotate: `${compassRotation}deg` }] },
        ]}
      >
        {/* Vẽ các mốc 0°, 30°, 60°, ..., 330° */}
        {Array.from({ length: 12 }, (_, i) => (
          <Text
            key={i}
            style={[
              styles.degreeMark,
              { transform: [{ rotate: `${-30 * i}deg` }] },
            ]}
          >
            {i * 30}°
          </Text>
        ))}
        {/* Các hướng N, E, S, W */}
        <Text style={[styles.direction, { top: 10 }]}>N</Text>
        <Text
          style={[
            styles.direction,
            { right: 10, top: "50%", transform: [{ translateY: -10 }] },
          ]}
        >
          E
        </Text>
        <Text style={[styles.direction, { bottom: 10 }]}>S</Text>
        <Text
          style={[
            styles.direction,
            { left: 10, top: "50%", transform: [{ translateY: -10 }] },
          ]}
        >
          W
        </Text>
        {/* Kim chỉ hướng Bắc cố định */}
        <View style={styles.northNeedle} />
      </View>

      {/* Kim chỉ hướng đi của thiết bị */}
      <View
        style={[
          styles.directionNeedle,
          { transform: [{ rotate: `${heading}deg` }] },
        ]}
      />

      {/* Hiển thị hướng hiện tại */}
      <Text style={styles.headingText}>
        {heading > 0 && heading < 180
          ? `N${Math.round(heading)}°`
          : `S${Math.round(360 - heading)}°`}
      </Text>

      {/* Hiển thị tọa độ */}
      <View style={styles.coordsContainer}>
        <Text>
          Vĩ Độ: {latitude ? `${latitude.toFixed(3)}°` : "Đang tải..."}
        </Text>
        <Text>
          Kinh Độ: {longitude ? `${longitude.toFixed(3)}°` : "Đang tải..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  compassContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  degreeMark: {
    position: "absolute",
    color: "white",
    fontSize: 12,
    transformOrigin: "150px 150px", // Điểm gốc là tâm vòng tròn
  },
  direction: {
    position: "absolute",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  northNeedle: {
    width: 2,
    height: 100,
    backgroundColor: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -1 }, { translateY: -100 }],
  },
  directionNeedle: {
    width: 2,
    height: 120,
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -1 }, { translateY: -120 }],
  },
  headingText: {
    color: "white",
    fontSize: 24,
    marginTop: 20,
    position: "absolute",
    top: 20,
  },
  coordsContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

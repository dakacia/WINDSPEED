import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Magnetometer } from "expo-sensors";

export default function Compass() {
  // State để lưu trữ góc hiện tại của la bàn
  const [heading, setHeading] = useState(0);
  // State để kiểm tra xem cảm biến từ trường có sẵn không
  const [isAvailable, setIsAvailable] = useState(false);
  // Ref để lưu trữ lịch sử các góc nhằm làm mượt chuyển động
  const headingHistoryRef = useRef([]);

  // Hook useEffect để thiết lập cảm biến từ trường
  useEffect(() => {
    // Kiểm tra xem cảm biến từ trường có sẵn trên thiết bị không
    Magnetometer.isAvailableAsync().then((result) => {
      setIsAvailable(result);
      if (result) {
        // Đăng ký lắng nghe dữ liệu từ cảm biến từ trường
        const subscription = Magnetometer.addListener((data) => {
          const { x, y } = data;
          // Tính toán góc dựa trên dữ liệu x, y từ cảm biến
          let angle = Math.atan2(y, x) * (180 / Math.PI);
          angle = angle >= 0 ? angle : angle + 360; // Đảm bảo góc nằm trong khoảng 0-360 độ

          // Lưu lịch sử 5 góc gần nhất để làm mượt
          headingHistoryRef.current = [
            ...headingHistoryRef.current,
            angle,
          ].slice(-5);
          const average =
            headingHistoryRef.current.reduce((sum, val) => sum + val, 0) /
            headingHistoryRef.current.length;
          setHeading(average); // Cập nhật góc trung bình
        });

        // Thiết lập tần suất cập nhật dữ liệu (100ms)
        Magnetometer.setUpdateInterval(100);

        // Hủy đăng ký khi component unmount
        return () => subscription.remove();
      }
    });
  }, []);

  // Nếu cảm biến không khả dụng, hiển thị thông báo
  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text>La bàn không khả dụng trên thiết bị này.</Text>
      </View>
    );
  }

  // Giao diện chính của la bàn
  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        {/* Các ký hiệu hướng N, S, E, W */}
        <Text
          style={[
            styles.direction,
            { top: 0, left: "50%", transform: [{ translateX: -10 }] },
          ]}
        >
          N
        </Text>
        <Text
          style={[
            styles.direction,
            { bottom: 0, left: "50%", transform: [{ translateX: -10 }] },
          ]}
        >
          S
        </Text>
        <Text
          style={[
            styles.direction,
            { left: 0, top: "50%", transform: [{ translateY: -10 }] },
          ]}
        >
          W
        </Text>
        <Text
          style={[
            styles.direction,
            { right: 0, top: "50%", transform: [{ translateY: -10 }] },
          ]}
        >
          E
        </Text>

        {/* Kim la bàn xoay theo hướng Bắc */}
        <View
          style={[
            styles.needle,
            { transform: [{ rotate: `${-heading}deg` }] }, // Dùng -heading để kim chỉ Bắc
          ]}
        />
      </View>
      {/* Hiển thị góc hiện tại */}
      <Text style={styles.headingText}>{Math.round(heading)}°</Text>
    </View>
  );
}

// Styles cho giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  compassContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  direction: {
    position: "absolute",
    fontSize: 20,
  },
  needle: {
    width: 2,
    height: 80,
    backgroundColor: "red",
    position: "absolute",
  },
  headingText: {
    fontSize: 24,
    marginTop: 20,
  },
});

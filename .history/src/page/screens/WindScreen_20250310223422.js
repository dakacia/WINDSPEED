import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Ionicons (hoặc dùng bất kỳ bộ icon nào bạn thích)
import { Ionicons } from "@expo/vector-icons";

const WindScreen = () => {
  // Dữ liệu demo
  const windSpeed = 7.8; // Đơn vị m/s (hoặc km/h)
  const windLevel = "Gentle Breeze"; // Mức độ gió (tùy vào thang đo Beaufort)

  return (
    <View style={styles.container}>
      {/* Tiêu đề (ví dụ hiển thị tên địa điểm, có thể bỏ nếu không cần) */}
      <Text style={styles.locationText}>Hà Nội, Việt Nam</Text>

      {/* Icon gió lớn ở giữa */}
      <Ionicons name="md-wind" size={120} color="#fff" style={styles.icon} />

      {/* Thông số tốc độ gió */}
      <Text style={styles.windSpeed}>{windSpeed} m/s</Text>

      {/* Mô tả mức độ gió */}
      <Text style={styles.windLevel}>{windLevel}</Text>
    </View>
  );
};

export default WindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4776E6", // Màu nền giả lập, bạn có thể đổi thành gradient
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  icon: {
    marginVertical: 20,
  },
  windSpeed: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  windLevel: {
    fontSize: 24,
    color: "#fff",
  },
});

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// // Ionicons (hoặc dùng bất kỳ bộ icon nào bạn thích)
// import { Ionicons } from "@expo/vector-icons";

// const WindScreen = () => {
//   // Dữ liệu demo
//   const windSpeed = 7.8; // Đơn vị m/s (hoặc km/h)
//   const windLevel = "Gentle Breeze"; // Mức độ gió (tùy vào thang đo Beaufort)

//   return (
//     <View style={styles.container}>
//       {/* Tiêu đề (ví dụ hiển thị tên địa điểm, có thể bỏ nếu không cần) */}
//       <Text style={styles.locationText}>Hà Nội, Việt Nam</Text>

//       {/* Icon gió lớn ở giữa */}
//       <Ionicons name="md-wind" size={120} color="#fff" style={styles.icon} />

//       {/* Thông số tốc độ gió */}
//       <Text style={styles.windSpeed}>{windSpeed} m/s</Text>

//       {/* Mô tả mức độ gió */}
//       <Text style={styles.windLevel}>{windLevel}</Text>
//     </View>
//   );
// };

// export default WindScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#4776E6", // Màu nền giả lập, bạn có thể đổi thành gradient
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   locationText: {
//     fontSize: 20,
//     color: "#fff",
//     marginBottom: 20,
//   },
//   icon: {
//     marginVertical: 20,
//   },
//   windSpeed: {
//     fontSize: 50,
//     color: "#fff",
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   windLevel: {
//     fontSize: 24,
//     color: "#fff",
//   },
// });

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome từ react-native-vector-icons

const WindScreen = () => {
  // Animated value cho hiệu ứng rung
  const shakeAnimation = new Animated.Value(0);

  // Dữ liệu demo
  const currentWindSpeed = 11; // m/s (theo hình ảnh)
  const windLevel = "Heavy Rain"; // Theo hình ảnh
  const forecastData = [
    { day: "Yesterday", speed: 6.5, icon: "cloud" },
    { day: "Today", speed: 11, icon: "cloud" },
    { day: "Tomorrow", speed: 7.8, icon: "cloud" },
  ];

  // Hiệu ứng rung cho icon
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => setTimeout(animate, 2000)); // Lặp lại sau 2 giây
    };
    animate();
  }, [shakeAnimation]);

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.locationText}>London, United Kingdom</Text>

        <Animated.View style={[styles.iconContainer, shakeStyle]}>
          <Icon name="cloud" size={120} color="#FFD60A" />
        </Animated.View>

        <Text style={styles.windSpeed}>{currentWindSpeed} km/h</Text>
        <Text style={styles.windLevel}>{windLevel}</Text>

        <View style={styles.forecastContainer}>
          {forecastData.map((item, index) => (
            <View key={index} style={styles.forecastBox}>
              <Text style={styles.forecastDay}>{item.day}</Text>
              <Icon name={item.icon} size={30} color="#fff" />
              <Text style={styles.forecastSpeed}>{item.speed} m/s</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default WindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ ảo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  locationText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  iconContainer: {
    marginVertical: 20,
  },
  windSpeed: {
    fontSize: 50,
    color: "#FFD60A",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  windLevel: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 50,
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  forecastBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Ô vuông mờ
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "30%",
  },
  forecastDay: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  forecastSpeed: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

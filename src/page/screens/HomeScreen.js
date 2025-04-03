import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../service/firebaseConfig"; // Import Firebase

const HomeScreen = () => {
  const [windData, setWindData] = useState([]);

  useEffect(() => {
    const windSpeedRef = ref(db, "windSpeed");

    const unsubscribe = onValue(windSpeedRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = Object.values(snapshot.val()); // Chuyển dữ liệu từ Firebase thành mảng
        const sortedData = rawData.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp theo thời gian
        setWindData(sortedData);
      }
    });

    return () => off(windSpeedRef, "value", unsubscribe); // Cleanup listener
  }, []);

  // Trích xuất mảng tốc độ từ dữ liệu
  const speeds = windData.map((item) => item.speed);

  // Tính toán số liệu thống kê
  const avgSpeed =
    speeds.length > 0
      ? (speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length).toFixed(2)
      : 0;
  const maxSpeed = speeds.length > 0 ? Math.max(...speeds).toFixed(2) : 0;
  const minSpeed = speeds.length > 0 ? Math.min(...speeds).toFixed(2) : 0;

  // Chuyển đổi dữ liệu thành định dạng của PieChart
  const pieData = [
    {
      name: "> 60 m/s",
      speed: speeds.filter((speed) => speed > 60).length,
      color: "#FF4444",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "30-60 m/s",
      speed: speeds.filter((speed) => speed >= 30 && speed <= 60).length,
      color: "#FFD700",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "< 30 m/s",
      speed: speeds.filter((speed) => speed < 30).length,
      color: "#32CD32",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
  <ScrollView style={styles.container}>

    {/* Card chứa Biểu đồ Tròn */}
    <View style={styles.card}>
      <Text style={styles.chartTitle}>Wind Speed Distribution</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get("window").width * 0.85}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        accessor={"speed"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        style={{ alignSelf: "center" }}
      />
    </View>

    
      <View style={styles.speedStats}>
        <View style={styles.speedStat}>
          <Text style={[styles.speedStatValue, { color: "#007BFF" }]}>{avgSpeed}</Text>
          <Text style={styles.speedStatLabel}>Avg Speed (m/s)</Text>
        </View>
        <View style={styles.speedStat}>
          <Text style={[styles.speedStatValue, { color: "#DC3545" }]}>{maxSpeed}</Text>
          <Text style={styles.speedStatLabel}>Max Speed (m/s)</Text>
        </View>
        <View style={styles.speedStat}>
          <Text style={[styles.speedStatValue, { color: "#28A745" }]}>{minSpeed}</Text>
          <Text style={styles.speedStatLabel}>Min Speed (m/s)</Text>
        </View>
      </View>

  </ScrollView>
</SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    alignSelf: "center",
    marginBottom: 20,
    width: "90%",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  speedStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  speedStat: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  speedStatValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  speedStatLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});



export default HomeScreen;

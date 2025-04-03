import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

// Demo data for LineChart
const lineData = {
  labels: [
    "1h",
    "2h",
    "3h",
    "4h",
    "5h",
    "6h",
    "7h",
    "8h",
    "9h",
    "10h",
    "11h",
    "12h",
  ],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 65, 25, 75, 35, 55, 85], // Wind speed in km/h
      color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`, // Light blue
      strokeWidth: 2,
    },
  ],
  legend: ["Wind Speed (km/h)"],
};

// Demo data for PieChart
const pieData = [
  {
    name: "> 60 km/h",
    speed: 4, // Count of data points > 60
    color: "#FF4444", // Red
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "30-60 km/h",
    speed: 5, // Count of data points 30-60
    color: "#FFD700", // Yellow
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "< 30 km/h",
    speed: 3, // Count of data points < 30
    color: "#32CD32", // Green
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Line Chart - Wind Speed over Time */}
        <Text style={styles.chartTitle}>Wind Speed by Hour</Text>
        <LineChart
          data={lineData}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" km/h"
          fromZero={true}
          yAxisInterval={20} // Steps of 20 km/h
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#00BFFF",
            },
          }}
          bezier
          style={styles.chart}
        />

        {/* Pie Chart - Wind Speed Distribution */}
        <Text style={styles.chartTitle}>Wind Speed Distribution</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
          accessor={"speed"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
          style={styles.chart}
        />

        <Text style={styles.sectionTitle}>Cash</Text>
        {/* Rest of your account items remain the same */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Updated styles
const styles = StyleSheet.create({
  // ... your existing styles ...

  container: {
    backgroundColor: "#FFF",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  chart: {
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HomeScreen;

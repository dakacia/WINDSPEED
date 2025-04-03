import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons'; // Dùng cho các biểu tượng
import { db } from '../../service/firebaseConfig';
import { ref, onValue } from 'firebase/database'; // Nhập các hàm Firebase

const screenWidth = Dimensions.get('window').width; // Chiều rộng màn hình

export default function App() {
  const [windData, setWindData] = useState([]); // Dữ liệu gió
  const [currentWindSpeed, setCurrentWindSpeed] = useState(0); // Trạng thái cho tốc độ gió hiện tại
  const [selectedTimeRange, setSelectedTimeRange] = useState(6); // Trạng thái cho khoảng thời gian (tính bằng giờ)

  // Lấy dữ liệu từ Firebase
  useEffect(() => {
    const windSpeedRef = ref(db, 'windSpeed');

    onValue(
      windSpeedRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const rawData = Object.values(snapshot.val()); // Chuyển dữ liệu Firebase thành mảng
          const sortedData = rawData.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp theo thời gian (mới nhất trước)
          setWindData(sortedData);
          if (sortedData.length > 0) {
            setCurrentWindSpeed(sortedData[0].speed); // Cập nhật tốc độ gió mới nhất
          }
        } else {
          console.log('Không có dữ liệu');
        }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu gió:', error);
      }
    );
  }, []);

  // Lấy số lượng giá trị gần nhất dựa trên selectedTimeRange
  const getRecentData = (count) => {
    return windData.slice(0, count); // Lấy số lượng giá trị gần nhất theo count
  };

  // Phân loại tốc độ gió và màu sắc
  const getSpeedCategory = (speed) => {
    if (speed >= 0 && speed <= 30) {
      return { label: 'Speed (Low)', color: '#00FF00' }; // Xanh lá cây
    } else if (speed > 30 && speed <= 60) {
      return { label: 'Speed (Medium)', color: '#FFA500' }; // Cam
    } else {
      return { label: 'Speed (High)', color: '#FF0000' }; // Đỏ
    }
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const recentData = getRecentData(selectedTimeRange); // Lấy số lượng giá trị gần nhất theo selectedTimeRange
  const lineData = {
    labels: recentData.map((_, index) => `${index + 1}`), // Nhãn là số thứ tự (1, 2, ..., n)
    datasets: [
      {
        data: recentData.map((item) => item.speed), // Dữ liệu tốc độ gió
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Tốc độ gió (m/s)'],
  };

  // Tính khoảng cách trục y động dựa trên phạm vi dữ liệu
  const speeds = recentData.map((item) => item.speed);
  const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;
  const yAxisInterval = maxSpeed > 0 ? Math.ceil(maxSpeed / 5) : 1;

  // Lấy thông tin phân loại tốc độ gió hiện tại
  const speedCategory = getSpeedCategory(currentWindSpeed);

  return (
    <View style={styles.container}>

      {/* Thẻ thông tin gió hiện tại */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Wind</Text>
        <Text style={styles.time}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <View style={styles.windInfo}>
          <View style={styles.windDetail}>
            <Ionicons name="speedometer-outline" size={24} color="#007AFF" />
            <Text style={styles.windText}>{currentWindSpeed.toFixed(2)} m/s</Text>
            <Text style={[styles.windSubText, { color: speedCategory.color }]}>
              {speedCategory.label}
            </Text>
          </View>
          <View style={styles.windDetail}>
            <Ionicons name="navigate-outline" size={24} color="#007AFF" />
            <Text style={styles.windText}>S</Text>
            <Text style={styles.windSubText}>Direction</Text>
          </View>
        </View>
      </View>

      {/* Nút chọn khoảng thời gian */}
      <View style={styles.timeRangeContainer}>
        <Text style={styles.timeRangeLabel}>Time Range:</Text>
        {[6, 12, 24].map((hours) => (
          <TouchableOpacity
            key={hours}
            style={[
              styles.timeButton,
              selectedTimeRange === hours && styles.activeButton,
            ]}
            onPress={() => setSelectedTimeRange(hours)}
            accessible
            accessibilityLabel={`Hiển thị dữ liệu trong ${hours} giờ qua`}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.timeButtonText,
                selectedTimeRange === hours && styles.activeButtonText,
              ]}
            >
              {hours}h
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Biểu đồ tốc độ gió */}
      {recentData.length > 0 ? (
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>WINDSPEED (Last {selectedTimeRange} hours) </Text>
          <LineChart
            data={lineData}
            width={screenWidth * 0.9}
            height={220}
            yAxisLabel=""
            yAxisSuffix=" m/s"
            fromZero={true}
            yAxisInterval={yAxisInterval}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#00BFFF',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  time: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  windInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    
  },
  windDetail: {
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 33,
  },
  windText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  windSubText: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeRangeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  timeButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff', // Màu trắng cho nút đang hoạt động
  },
  graphContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  // legendDot: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: '#007AFF',
  //   marginRight: 5,
  // },
  // legendText: {
  //   fontSize: 14,
  //   color: '#333',
  // },
  chart: {
    borderRadius: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
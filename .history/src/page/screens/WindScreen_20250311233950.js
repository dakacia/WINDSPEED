import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const WindScreen = () => {
  const shakeAnimation = new Animated.Value(0);
  const [blinkAnimation] = useState(new Animated.Value(1));

  const currentWindSpeedMs = 10; // m/s
  const currentWindSpeedKmh = currentWindSpeedMs * 3.6; // Chuyển sang km/h
  const [windLevel, setWindLevel] = useState("Light Breeze");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1598136490929-292193fbb0da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" // Mặc định là clear sky
  );
  const [iconName, setIconName] = useState("wind");

  const forecastData = [
    { day: "Hai giờ trước", speed: 6.5, icon: "cloud" },
    { day: "Một giờ trước", speed: 11, icon: "cloud" },
    { day: "Hiện tại", speed: 7.8, icon: "cloud" },
  ];

  const [data, setData] = useState(forecastData);

  useEffect(() => {
    if (currentWindSpeedKmh > 60) {
      setWindLevel("Storm");
      setBackgroundImage(
        "https://images.unsplash.com/photo-1505142469309-ee6f29323a2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
      );
      setIconName("cloud-showers-heavy");
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (currentWindSpeedKmh >= 30) {
      setWindLevel("Moderate Wind");
      setBackgroundImage(
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
      );
      setIconName("wind");
      blinkAnimation.setValue(1);
    } else {
      setWindLevel("Light Breeze");
      setBackgroundImage(
        "https://images.unsplash.com/photo-1598136490929-292193fbb0da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
      );
      setIconName("wind");
      blinkAnimation.setValue(1);
    }
  }, [currentWindSpeedKmh, blinkAnimation]);

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
      ]).start(() => setTimeout(animate, 2000));
    };
    animate();
  }, [shakeAnimation]);

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {currentWindSpeedKmh > 60 && (
          <Animated.View style={[styles.warning, { opacity: blinkAnimation }]}>
            <Text style={styles.warningText}>CẢNH BÁO: Gió mạnh!</Text>
          </Animated.View>
        )}
        <Text style={styles.locationText}>Hà Đông, Hà Nội</Text>

        <Animated.View style={[styles.iconContainer, shakeStyle]}>
          <Icon
            name={iconName}
            size={120}
            color={currentWindSpeedKmh > 60 ? "#FF4444" : "#FFD60A"}
          />
        </Animated.View>

        <Text style={styles.windSpeed}>
          {currentWindSpeedKmh.toFixed(1)} km/h
        </Text>
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
    </ImageBackground>
  );
};

export default WindScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(66, 107, 121, 0.32)", // Xanh nước biển với opacity 50%
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  locationText: {
    fontSize: 24,
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
    marginBottom: 20,
  },
  warning: {
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  warningText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  forecastBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "30%",
  },
  forecastDay: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 5,
  },
  forecastSpeed: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

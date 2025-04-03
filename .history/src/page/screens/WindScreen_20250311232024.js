import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const WindScreen = () => {
  const shakeAnimation = new Animated.Value(0);
  const [blinkAnimation] = useState(new Animated.Value(1));

  // Convert m/s to km/h (1 m/s = 3.6 km/h)
  const currentWindSpeedMs = 11; // m/s
  const currentWindSpeedKmh = currentWindSpeedMs * 3.6; // Convert to km/h
  const [windLevel, setWindLevel] = useState("Light Breeze");
  const [backgroundImage, setBackgroundImage] = useState(
    require("./assets/clear-sky.jpg") // Add these images to your assets folder
  );
  const [iconName, setIconName] = useState("wind");

  const forecastData = [
    { day: "Hai giờ trước", speed: 6.5, icon: "cloud" },
    { day: "Một giờ trước", speed: 11, icon: "cloud" },
    { day: "Hiện tại", speed: 7.8, icon: "cloud" },
  ];

  const [data, setData] = useState(forecastData);

  // Determine wind conditions and update UI
  useEffect(() => {
    if (currentWindSpeedKmh > 60) {
      setWindLevel("Storm");
      setBackgroundImage(require("./assets/storm.jpg"));
      setIconName("cloud-showers-heavy");
      // Start warning blink animation
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
      setBackgroundImage(require("./assets/light-rain.jpg"));
      setIconName("wind");
      blinkAnimation.setValue(1); // Reset warning
    } else {
      setWindLevel("Light Breeze");
      setBackgroundImage(require("./assets/clear-sky.jpg"));
      setIconName("wind");
      blinkAnimation.setValue(1); // Reset warning
    }
  }, [currentWindSpeedKmh, blinkAnimation]);

  // Shake animation for icon
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
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
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

        {currentWindSpeedKmh > 60 && (
          <Animated.View style={[styles.warning, { opacity: blinkAnimation }]}>
            <Text style={styles.warningText}>WARNING: Strong Wind Alert!</Text>
          </Animated.View>
        )}

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
    backgroundColor: "rgba(0, 191, 255, 0.5)", // Sea blue with 50% opacity
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

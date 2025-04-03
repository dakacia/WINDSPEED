import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.box1}>
        <Text style={styles.box11}></Text>
        <Text style={styles.box12}></Text>
      </Text>
      <Text style={styles.box2}>Portfolio Screen</Text>
      <Text style={styles.box3}>Portfolio Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
  },
  box1: {
    width: "100%",
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
  },
  box11: {
    width: "100%",
    flex: 1,
    backgroundColor: "green",
  },
  box12: {
    width: "100%",
    flex: 1,
    backgroundColor: "black",
  },

  box2: {
    width: "100%",
    flex: 1,
    backgroundColor: "blue",
  },
  box3: {
    width: "100%",
    flex: 1,
    backgroundColor: "orange",
  },
});

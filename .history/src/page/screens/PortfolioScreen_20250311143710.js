import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.box1}>Portfolio Screen</Text>
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
    // flexDirection: "row",
  },
  box1: {
    width: "100%",
    flex: 1,
    backgroundColor: "red",
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.box1}>
          <Text style={styles.box11}>hello1</Text>
          <Text style={styles.box12}>hello2</Text>
        </Text>
      </View>
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
    // flexDirection: "column",
  },
  box1: {
    width: "100%",
    flex: 1,
    backgroundColor: "red",
    flexDirection: "column",
  },
  box11: {
    flex: 1,
    backgroundColor: "green",
  },
  box12: {
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

// học css bootstrap
// học css grip
// học css evondev

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      {/* Box1 */}
      <View style={styles.box1}>
        <View style={styles.box11}>
          <Text style={styles.text}>hello1</Text>
        </View>
        <View style={styles.box12}>
          <Text style={styles.text}>hello2</Text>
        </View>
      </View>

      {/* Box2 */}
      <View style={styles.box2}>
        <Text style={styles.text}>Portfolio Screen</Text>
      </View>

      {/* Box3 */}
      <View style={styles.box3}>
        <Text style={styles.text}>Portfolio Screen</Text>
      </View>
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

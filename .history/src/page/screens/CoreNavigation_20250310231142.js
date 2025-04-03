import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function HomeScreen() {
  return <Text>Home Screen</Text>;
}
function ExpensesScreen() {
  return <Text>Expenses Screen</Text>;
}

const CoreNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <View style={{ flex: 1 }}>
      {/* Nội dung thay đổi theo tab */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "expenses" && <ExpensesScreen />}
      </View>

      {/* Thanh bottom tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => setActiveTab("home")}>
          <Text style={activeTab === "home" ? styles.active : styles.inactive}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("expenses")}>
          <Text
            style={activeTab === "expenses" ? styles.active : styles.inactive}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoreNavigation;

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  active: {
    color: "blue",
    fontWeight: "bold",
  },
  inactive: {
    color: "gray",
  },
});

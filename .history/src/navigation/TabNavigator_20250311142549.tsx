import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import các màn hình
import HomeScreen from "../page/screens/HomeScreen";
import ExpensesScreen from "../page/screens/ExpensesScreen";
import PortfolioScreen from "../page/screens/PortfolioScreen";
import BankAccountsScreen from "../page/screens/BankAccountsScreen";
import WindScreen from "../page/screens/WindScreen";
import CoreNavigation from "../page/screens/CoreNavigation";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Expenses") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (route.name === "Portfolio") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "BankAccounts") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Time") {
            iconName = focused ? "time" : "time-outline"; // Ví dụ
          } else if (route.name === "Compass") {
            iconName = focused ? "compass" : "compass-outline"; // Ví dụ
          } else {
            iconName = "help-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B0D",
        tabBarInactiveTintColor: "gray",
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen name="Home" component={WindScreen} />
      <Tab.Screen name="Time" component={HomeScreen} />
      <Tab.Screen name="Compass" component={ExpensesScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="BankAccounts" component={BankAccountsScreen} />
      <Tab.Screen name="Core" component={CoreNavigation} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

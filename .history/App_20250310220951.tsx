import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import các màn hình
import HomeScreen from "./screens/HomeScreen";
import ExpensesScreen from "./screens/ExpensesScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import BankAccountsScreen from "./screens/BankAccountsScreen";

// Import icon Ionicons
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Thiết lập icon cho mỗi tab
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Expenses") {
              iconName = focused ? "cash" : "cash-outline";
            } else if (route.name === "Portfolio") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "BankAccounts") {
              iconName = focused ? "wallet" : "wallet-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Màu sắc cho icon
          tabBarActiveTintColor: "#FF6B0D",
          tabBarInactiveTintColor: "gray",
          // Tùy chỉnh header
          headerTitleAlign: "center",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="BankAccounts" component={BankAccountsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

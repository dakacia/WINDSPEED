import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import các màn hình
import HomeScreen from "./src/page/screens/HomeScreen";
import ExpensesScreen from "./src/page/screens/ExpensesScreen";
import PortfolioScreen from "./src/page/screens/PortfolioScreen";
import BankAccountsScreen from "./src/page/screens/BankAccountsScreen";
import WindScreen from "./src/page/screens/WindScreen";

// Import icon Ionicons
import { Ionicons } from "@expo/vector-icons";
import CoreNavigation from "./src/page/screens/CoreNavigation";

// Nếu muốn, bạn có thể định nghĩa kiểu cho route param:
// type RootTabParamList = {
//   Home: undefined;
//   Expenses: undefined;
//   Portfolio: undefined;
//   BankAccounts: undefined;
// };

// const Tab = createBottomTabNavigator<RootTabParamList>();
const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Thiết lập icon cho mỗi tab
          tabBarIcon: ({ focused, color, size }) => {
            // Khai báo kiểu cho iconName để tránh lỗi TypeScript
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Expenses") {
              iconName = focused ? "cash" : "cash-outline";
            } else if (route.name === "Portfolio") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "BankAccounts") {
              iconName = focused ? "wallet" : "wallet-outline";
            } else {
              // Fallback icon
              iconName = "help-circle-outline";
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
        <Tab.Screen name="WindScreen" component={WindScreen} />
        <Tab.Screen name="Core" component={CoreNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

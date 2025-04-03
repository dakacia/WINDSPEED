import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <View style={css.frontEnd}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Click me to say hello"
        onPress={handleIncrease}
        color="green"
      />
    </View>
  );
}

const css = StyleSheet.create({
  frontEnd: {
    flex: 1,
    backgroundColor: "purple",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

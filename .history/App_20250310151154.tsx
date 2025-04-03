import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={css.frontEnd}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title={hello} />
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

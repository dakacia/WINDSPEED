import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const handleCreateUser = () => {
    alert("Hello");
  };
  return (
    <View style={css.frontEnd}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Click me to say hello"
        onPress={handleCreateUser}
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

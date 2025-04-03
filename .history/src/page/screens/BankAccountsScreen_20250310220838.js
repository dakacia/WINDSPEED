import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BankAccountsScreen() {
  return (
    <View style={styles.container}>
      <Text>Bank Accounts Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

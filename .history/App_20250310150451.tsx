import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [actionModal, setActionModal] = useState("CREATE");
  const handleButtonClose = () => {};
  const handleChangeInput = () => {};

  const handleCreateUser = () => {};
  return (
    <Modal
      visible={true}
      animationType="slide"
      onRequestClose={handleButtonClose}
      transparent={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{actionModal} USER</Text>
          <Button title="X" onPress={handleButtonClose} />
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Email */}
          <Text style={styles.label}>Email(*)</Text>
          <TextInput
            editable={actionModal === "CREATE"} // thay cho disabled
            keyboardType="email-address"
          />

          {/* Username */}
          <Text style={styles.label}>Username(*)</Text>
          <TextInput style={[styles.input]} />

          {/* Phone */}
          <Text style={styles.label}>Phone(*)</Text>
          <TextInput keyboardType="phone-pad" />

          {/* Password (chỉ hiển thị khi CREATE) */}
          {actionModal === "CREATE" && (
            <>
              <Text style={styles.label}>Password(*)</Text>
              <TextInput secureTextEntry={true} />
            </>
          )}

          {/* Sex */}
          <Text style={styles.label}>Sex(*)</Text>
          <Picker style={styles.picker}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          {/* Group */}
          <Text style={styles.label}>Group(*)</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button title="Close" onPress={handleButtonClose} color="#777" />
          <Button title="Save" onPress={handleCreateUser} color="green" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

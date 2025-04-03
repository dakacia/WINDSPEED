import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [actionModal, setActionModal] = useState("CREATE");
  const handleButtonClose = () => {};
  const handleChangeInput = () => {};

  const handleCreateUser = () => {};
  return (
    <Modal
      visible={visible}
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
            style={[styles.input, !validValue.email && { borderColor: "red" }]}
            editable={actionModal === "CREATE"} // thay cho disabled
            keyboardType="email-address"
            value={initValue.email}
            onChangeText={(text) => handleChangeInput(text, "email")}
          />

          {/* Username */}
          <Text style={styles.label}>Username(*)</Text>
          <TextInput
            style={[
              styles.input,
              !validValue.username && { borderColor: "red" },
            ]}
            value={initValue.username}
            onChangeText={(text) => handleChangeInput(text, "username")}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone(*)</Text>
          <TextInput
            style={[styles.input, !validValue.phone && { borderColor: "red" }]}
            keyboardType="phone-pad"
            value={initValue.phone}
            onChangeText={(text) => handleChangeInput(text, "phone")}
          />

          {/* Password (chỉ hiển thị khi CREATE) */}
          {actionModal === "CREATE" && (
            <>
              <Text style={styles.label}>Password(*)</Text>
              <TextInput
                style={[
                  styles.input,
                  !validValue.password && { borderColor: "red" },
                ]}
                secureTextEntry={true}
                value={initValue.password}
                onChangeText={(text) => handleChangeInput(text, "password")}
              />
            </>
          )}

          {/* Sex */}
          <Text style={styles.label}>Sex(*)</Text>
          <Picker
            selectedValue={initValue.sex}
            style={styles.picker}
            onValueChange={(itemValue) => handleChangeInput(itemValue, "sex")}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          {/* Group */}
          <Text style={styles.label}>Group(*)</Text>
          <Picker
            selectedValue={initValue.groupId}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleChangeInput(itemValue, "groupId")
            }
          >
            {groupName.length > 0 &&
              groupName.map((item, index) => {
                return (
                  <Picker.Item
                    key={`group-${index}`}
                    label={item.name}
                    value={item.id.toString()}
                  />
                );
              })}
          </Picker>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

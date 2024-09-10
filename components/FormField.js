import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.BLACK}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: -50 }}
          >
            <Feather
              name={!showPassword ? "eye" : "eye-off"}
              size={24}
              color={Colors.BLACK}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 20,
  },
  inputField: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
    height: 50,
    borderWidth: 1,
  },
  input: {
    color: "black",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    width: "100%",
  },
});

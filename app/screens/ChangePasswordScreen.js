import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import PasswordField from "../../components/PasswordField";
import { AuthContext } from "../context/AuthContext";
import { handleChangePassword } from "../services/handleAPI";

export default function ChangePasswordScreen() {
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();
  const [changePwform, setChangePwForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    confirm_password: "",
  });

  const changePassword = async (
    old_password,
    new_password,
    confirm_password,
    userToken
  ) => {
    if (!old_password || !new_password || !confirm_password) {
      Alert.alert("Notice", "Please fill in all the fields");
    } else if (confirm_password !== new_password) {
      return;
    } else {
      try {
        const response = await handleChangePassword(
          old_password,
          new_password,
          userToken
        );
        if (response.status === 200) {
          Alert.alert("Info", response.data?.message);
          navigation.goBack();
        }
      } catch (error) {
        if (error.status === 400 && error.data) {
          const errorMessages = Object.entries(error?.data)
            .map(([field, message]) => `${message.join(", ")}`)
            .join("\n");
          Alert.alert("Error", errorMessages);
        } else {
          Alert.alert("Error", "An unexpected error occurred.");
        }
      }
    }
  };

  const checkConfirmPassword = () => {
    if (changePwform.confirm_password !== changePwform.new_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "(*) Confirm password do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginBottom: 20,
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            marginBottom: 40,
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "center", marginLeft: 10 }}
          >
            <Ionicons name="arrow-back-circle" size={40} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Change password</Text>
        <View style={styles.form}>
          <PasswordField
            title="Old password"
            handleChangeText={(e) =>
              setChangePwForm({ ...changePwform, old_password: e })
            }
          />
          <PasswordField
            title="New password"
            handleChangeText={(e) =>
              setChangePwForm({ ...changePwform, new_password: e })
            }
          />
          <PasswordField
            title="Confirm password"
            handleChangeText={(e) =>
              setChangePwForm({ ...changePwform, confirm_password: e })
            }
            handleBlur={checkConfirmPassword}
            errorMessage={errors.confirm_password}
          />

          <TouchableOpacity
            style={styles.btnSaveChange}
            onPress={() =>
              changePassword(
                changePwform.old_password,
                changePwform.new_password,
                changePwform.confirm_password,
                userToken
              )
            }
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Save change
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    marginTop: -23,
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  form: {
    width: "100%",
    paddingHorizontal: 12,
    marginVertical: 14,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  btnSaveChange: {
    backgroundColor: Colors.SECONDARY,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 99,
  },
});

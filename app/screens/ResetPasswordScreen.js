import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../components/FormField";
import { handleResetPassword } from "../services/handleAPI";

export default function ResetPasswordScreen() {
  const [form, setForm] = useState({
    email: "",
  });
  const navigation = useNavigation();

  const resetPassword = async (email) => {
    if (!email) {
      Alert.alert("Notice", "Please fill in all the fields.");
    } else {
      try {
        const response = await handleResetPassword(email);
        if (response.status === 200) {
          Alert.alert("Info", response.data?.message);
          navigation.goBack();
        }
      } catch (error) {
        if (error.status === 400) {
          Alert.alert("Error", error?.data?.message);
        } else {
          Alert.alert("Error", "An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            marginBottom: 20,
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
          </TouchableOpacity>
          <View
            style={[
              { marginTop: 35, padding: 10, marginLeft: 20 },
              styles.rowStyle,
            ]}
          >
            <Text style={{ color: Colors.WHITE, fontSize: 20 }}>E</Text>
            <Text style={{ color: Colors.WHITE, marginTop: 8 }}>NGINA</Text>
          </View>
          <Image
            source={require("../../assets/images/imgLogo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.form}>
          <Text style={[styles.title, { color: Colors.PRIMARY }]}>
            Reset password
          </Text>

          <FormField
            title="Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => resetPassword(form.email)}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Submit
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
  form: {
    width: "100%",
    paddingHorizontal: 12,
    marginVertical: 14,
    alignContent: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  logo: {
    padding: 20,
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    fontSize: 28,
    marginBottom: 20,
    marginTop: 20,
  },
  btnSubmit: {
    backgroundColor: Colors.SECONDARY,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 99,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

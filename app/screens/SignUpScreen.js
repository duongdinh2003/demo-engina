import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../components/FormField";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthContext";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import PasswordField from "../../components/PasswordField";

export default function SignUpScreen() {
  const { signup, isLoading } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const submit = () => {
    if (!form.usernameEmail || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    console.log(form.usernameEmail);
    console.log(form.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Sign up to have fun and learn faster
          </Text>

          <FormField
            title="Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
          <FormField
            title="Username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <FormField
            title="Password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <PasswordField
            title="Confirm password"
            handleChangeText={(e) => setForm({ ...form, confirm_password: e })}
          />

          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => {
              signup(form.username, form.password, form.email);
            }}
            disabled={isLoading}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          <View style={[styles.rowStyle, { justifyContent: "space-between" }]}>
            <View style={styles.rowStyle}>
              <Text style={styles.txt}>{`Have an account already? `}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                <Text style={[styles.txt, { color: Colors.PRIMARY }]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Or
          </Text>

          <GoogleAuthButton />
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
  btnSignUp: {
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
  txt: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  btnGoogleSignUp: {
    backgroundColor: Colors.WHITE,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 99,
    marginTop: 25,
    gap: 20,
    borderWidth: 1,
  },
});

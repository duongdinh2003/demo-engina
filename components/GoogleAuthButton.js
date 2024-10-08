import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Colors from "../constants/Colors";
import { handleGoogleSignIn } from "../app/services/handleAPI";
import { AuthContext } from "../app/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;
const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuthButton() {
  const { setUserToken, setIsFirstSignIn } = useContext(AuthContext);

  const config = {
    webClientId,
    iosClientId,
    androidClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  // console.log("redirect_uri:", request?.redirectUri);

  const handleToken = async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("Access Token from Google:", token);

      try {
        const response = await handleGoogleSignIn(token);
        if (response.status === 200) {
          let tokens = response.data;
          console.log("Sign in or Sign up successfully");
          console.log("Resp Google:", tokens);
          setUserToken(tokens?.access);
          setIsFirstSignIn(tokens?.is_first_login);

          AsyncStorage.setItem("userToken", tokens?.access);
        }
      } catch (error) {
        if (error.status === 403) {
          console.log("Error 403:", error.data);
        } else if (error.status === 400) {
          console.log("Error 400:", error.data);
        } else {
          console.log("Unexpected error");
        }
      }
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View>
      <TouchableOpacity
        style={styles.btnGoogleAuth}
        onPress={() => promptAsync()}
      >
        <Image
          source={require("../assets/images/google.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: Colors.BLACK,
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnGoogleAuth: {
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

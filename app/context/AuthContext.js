import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { handleSignIn, handleSignUp } from "../services/handleAPI";
import { validateEmail } from "../services/utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [isFirstSignIn, setIsFirstSignIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const signin = async (username, password) => {
    if (!username || !password) {
      Alert.alert("Notice", "Please fill in all the fields!");
    } else {
      // setIsLoading(true);

      try {
        const response = await handleSignIn(username, password);
        if (response.status === 200) {
          // setIsLoading(false);
          let tokens = response.data;
          setUserToken(tokens?.access);

          AsyncStorage.setItem("userToken", tokens?.access);
        }
      } catch (error) {
        if (error.status === 400) {
          Alert.alert("Error", error?.data?.details);
        } else {
          Alert.alert("Error", "An unexpected error occurred.");
        }
      } finally {
        // setIsLoading(false);
      }
    }
  };

  const signout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const signup = async (username, password, email, confirm_password) => {
    if (!username || !password || !email || !confirm_password) {
      Alert.alert("Notice", "Please fill in all the fields!");
    } else if (!validateEmail(email)) {
      return;
    } else if (password !== confirm_password) {
      return;
    } else {
      // setIsLoading(true);
      try {
        const response = await handleSignUp(username, password, email);
        if (response.status === 201) {
          let signUpTokens = response.data;

          setUserToken(signUpTokens?.tokens?.access);
          setIsFirstSignIn(signUpTokens?.tokens?.is_first_login);

          AsyncStorage.setItem("userToken", signUpTokens?.tokens?.access);
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

      // setIsLoading(false);
    }
  };

  const isSignedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log("isSignedIn error:", error);
    }
  };

  useEffect(() => {
    isSignedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signout,
        signup,
        isLoading,
        userToken,
        setUserToken,
        isFirstSignIn,
        setIsFirstSignIn,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

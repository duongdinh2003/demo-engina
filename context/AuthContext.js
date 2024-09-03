import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);

  const signin = (username, password) => {
    if (!username || !password) {
      Alert.alert("Notice", "Please fill in all the fields!");
    } else {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/login/`, {
          username,
          password,
        })
        .then((res) => {
          let tokens = res.data;
          setUserToken(tokens?.access);

          AsyncStorage.setItem("userToken", tokens?.access);

          console.log("Response:", tokens);
          console.log("Access Token sign in:", tokens?.access);
        })
        .catch((e) => {
          console.log("Error sign in:", e);
        });

      setIsLoading(false);
    }
  };

  const signout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const signup = (username, password, email) => {
    if (!username || !password || !email) {
      Alert.alert("Notice", "Please fill in all the fields!");
    } else {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/register/`, {
          username,
          password,
          email,
        })
        .then((res) => {
          let signUpTokens = res.data;
          setUserToken(signUpTokens?.tokens?.access);

          AsyncStorage.setItem("userToken", signUpTokens?.tokens?.access);

          console.log("Response:", signUpTokens);
          console.log("Access Token sign up:", signUpTokens?.tokens?.access);
        })
        .catch((e) => {
          console.log("Error sign up:", e);
        });

      setIsLoading(false);
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
      value={{ signin, signout, signup, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants/api";

export default function ProfileScreen() {
  const { userToken, signout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    daily_study_time: "",
    english_level: "",
    full_name: "",
    gender: true,
    phone_number: "",
  });

  const getUserProfile = () => {
    axios
      .get(`${BASE_URL}/profile/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log("Response profile:", res.data);
        setUserProfile(res.data);
      })
      .catch((e) => {
        console.log("Error profile:", e);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/userDefault.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, marginRight: 15, borderWidth: 1, borderRadius: 15 },
        ]}
      >
        <Text>Full name:</Text>
        <View style={styles.txtInput}>
          <TextInput value={userProfile?.full_name} />
        </View>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, marginRight: 15, borderWidth: 1, borderRadius: 15 },
        ]}
      >
        <Text>Gender:</Text>
        <View style={styles.txtInput}>
          <TextInput value={userProfile?.gender ? "Male" : "Female"} />
        </View>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, marginRight: 15, borderWidth: 1, borderRadius: 15 },
        ]}
      >
        <Text>English level:</Text>
        <View style={styles.txtInput}>
          <TextInput value={userProfile?.english_level} />
        </View>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, marginRight: 15, borderWidth: 1, borderRadius: 15 },
        ]}
      >
        <Text>Daily study time:</Text>
        <View style={styles.txtInput}>
          <TextInput value={userProfile?.daily_study_time} />
        </View>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, marginRight: 15, borderWidth: 1, borderRadius: 15 },
        ]}
      >
        <Text>Phone number:</Text>
        <View style={styles.txtInput}>
          <TextInput value={userProfile?.phone_number} />
        </View>
      </View>
      <View style={{ padding: 30 }}>
        <TouchableOpacity
          onPress={() => {
            signout();
          }}
        >
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 30,
    display: "flex",
    alignItems: "center",
    borderBottomColor: "gray",
  },
  txtInput: {
    width: "100%",
    height: 50,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

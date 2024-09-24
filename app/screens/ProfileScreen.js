import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { MEDIA_URL } from "../../constants/api";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import imgDefault from "../../assets/images/userDefault.png";
import { useNavigation } from "@react-navigation/native";
import {
  handleGetUserProfile,
  handleUploadAvatar,
} from "../services/handleAPI";

export default function ProfileScreen() {
  const { userToken, signout, userInfo, setUserInfo } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    daily_study_time: "",
    english_level: "",
    full_name: "",
    gender: true,
    phone_number: "",
  });
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const uploadImage = async () => {
    try {
      let result = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error when upload image:", error);
    }
  };

  const saveImage = async (image) => {
    try {
      // uploaded displayed image
      setImage(image);

      // upload avatar via api
      await uploadAvatar(image);

      setUserInfo(image);
    } catch (error) {
      throw error;
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await handleGetUserProfile(userToken);
      if (response.status === 200) {
        setUserProfile(response.data);
        setImage(
          response.data?.avatar ? MEDIA_URL + response.data?.avatar : null
        );
      }
    } catch (error) {
      if (error.status === 400 && error.data) {
        const errorMessages = Object.entries(error?.data)
          .map(([field, message]) => `${message.join(", ")}`)
          .join("\n");
        Alert.alert("Error", errorMessages);
      } else if (error.status === 401 && error.data) {
        const errorMessages = Object.entries(error?.data)
          .map(([field, message]) => `${message.join(", ")}`)
          .join("\n");
        Alert.alert("Error", errorMessages);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const uploadAvatar = async (image) => {
    try {
      const response = await handleUploadAvatar(image, userToken);
      if (response.status === 200) {
        Alert.alert("Info", response.data?.message);
        console.log("Resp avatar:", response.data);
      }
    } catch (error) {
      if (error.status === 400 && error.data) {
        const errorMessages = Object.entries(error?.data)
          .map(([field, message]) => `${message.join(", ")}`)
          .join("\n");
        Alert.alert("Error", errorMessages);
      } else if (error.status === 413 && error.data) {
        const errorMessages = Object.entries(error?.data)
          .map(([field, message]) => `${message.join(", ")}`)
          .join("\n");
        Alert.alert("Error", errorMessages);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [userInfo]);

  return (
    <SafeAreaView>
      <View style={styles.avatarContainer}>
        <Image
          source={image ? { uri: image } : imgDefault}
          style={[styles.imgAvatar]}
        />
        <TouchableOpacity
          style={styles.editAvatarBtn}
          onPress={() => uploadImage()}
        >
          <Ionicons name="camera-outline" size={30} color={Colors.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnEdit}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("edit-profile", { profileInfo: userProfile })
          }
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, borderWidth: 1, borderRadius: 10, margin: 10 },
        ]}
      >
        <Text>Full name:</Text>
        <Text>{userProfile?.full_name}</Text>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, borderWidth: 1, borderRadius: 10, margin: 10 },
        ]}
      >
        <Text>Gender:</Text>
        <Text>{userProfile?.gender ? "Male" : "Female"}</Text>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, borderWidth: 1, borderRadius: 10, margin: 10 },
        ]}
      >
        <Text>English level:</Text>
        <Text>{userProfile?.english_level}</Text>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, borderWidth: 1, borderRadius: 10, margin: 10 },
        ]}
      >
        <Text>Daily study time:</Text>
        <Text>{userProfile?.daily_study_time}</Text>
      </View>
      <View
        style={[
          styles.rowStyle,
          { padding: 10, borderWidth: 1, borderRadius: 10, margin: 10 },
        ]}
      >
        <Text>Phone number:</Text>
        <Text>{userProfile?.phone_number}</Text>
      </View>
      <View style={{ padding: 30 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("change-password")}
        >
          <Text>Change password</Text>
        </TouchableOpacity>
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
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  imgAvatar: {
    borderRadius: 75,
    width: 120,
    height: 120,
    borderColor: Colors.GRAY,
    borderWidth: 3,
  },
  editAvatarBtn: {
    backgroundColor: Colors.WHITE,
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    bottom: 5,
  },
  btnEdit: {
    padding: 20,
    alignItems: "flex-end",
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FormField from "../../components/FormField";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import DropDown from "../../components/DropDown";
import { level, study_time } from "../../constants/DropDownItem";
import { handleUpdateProfile } from "../services/handleAPI";

export default function ProfileEditScreen({ route }) {
  const { userToken, setUserInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [editForm, setEditForm] = useState({
    full_name: "",
    english_level: "",
    daily_study_time: "",
    phone_number: "",
    gender: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profileInfo } = route.params;

  const updateProfile = async (
    full_name,
    english_level,
    daily_study_time,
    phone_number,
    gender
  ) => {
    if (!full_name || !phone_number) {
      Alert.alert("Notice", "Please fill in all the fields.");
    } else {
      setIsSubmitting(true);

      try {
        const response = await handleUpdateProfile(
          full_name,
          english_level,
          daily_study_time,
          phone_number,
          gender,
          userToken
        );
        if (response.status === 200) {
          Alert.alert("Info", response.data?.message);
          setIsSubmitting(false);
          setUserInfo(editForm);
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
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    setEditForm(profileInfo);
  }, []);

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
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.form}>
          <FormField
            title="Full name"
            value={editForm.full_name}
            handleChangeText={(e) => setEditForm({ ...editForm, full_name: e })}
          />
          <DropDown
            title="English level"
            placeholder={editForm.english_level}
            data={level}
            pos={167}
            handleSelect={(e) => setEditForm({ ...editForm, english_level: e })}
          />
          <DropDown
            title="Daily study time"
            placeholder={editForm.daily_study_time}
            data={study_time}
            pos={167}
            handleSelect={(e) =>
              setEditForm({ ...editForm, daily_study_time: e })
            }
          />
          <FormField
            title="Phone number"
            value={editForm.phone_number}
            keyboardType="numeric"
            handleChangeText={(e) =>
              setEditForm({ ...editForm, phone_number: e })
            }
          />

          <TouchableOpacity
            style={[
              styles.btnSaveChange,
              {
                backgroundColor: isSubmitting
                  ? Colors.LIGHT_SECONDARY
                  : Colors.SECONDARY,
              },
            ]}
            onPress={() =>
              updateProfile(
                editForm.full_name,
                editForm.english_level,
                editForm.daily_study_time,
                editForm.phone_number,
                editForm.gender
              )
            }
            disabled={isSubmitting}
            activeOpacity={1.0}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Save changes
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
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 99,
  },
});

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import FormField from "../../components/FormField";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import DropDown from "../../components/DropDown";
import { level, study_time } from "../../constants/DropDownItem";
import { handleUpdateProfile } from "../services/handleAPI";

export default function AddInfoModal() {
  const { userToken, setIsFirstSignIn } = useContext(AuthContext);
  const [addInfoForm, setAddInfoForm] = useState({
    full_name: "",
    english_level: "",
    daily_study_time: "",
    phone_number: "",
    gender: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addInfo = async (
    full_name,
    english_level,
    daily_study_time,
    phone_number,
    gender
  ) => {
    if (!full_name || !english_level || !daily_study_time || !phone_number) {
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
          setIsFirstSignIn(false);
          setIsSubmitting(false);
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

  const handleSelectLevel = (item) => {
    setAddInfoForm({ ...addInfoForm, english_level: item });
  };

  const handleSelectStudyTime = (item) => {
    setAddInfoForm({ ...addInfoForm, daily_study_time: item });
  };

  return (
    <Modal>
      <Text style={styles.title}>Add information</Text>
      <View style={styles.form}>
        <FormField
          title="Full name"
          handleChangeText={(e) =>
            setAddInfoForm({ ...addInfoForm, full_name: e })
          }
        />
        <DropDown
          title="English level"
          data={level}
          placeholder="Select level"
          pos={110}
          handleSelect={handleSelectLevel}
        />
        <DropDown
          title="Daily study time"
          data={study_time}
          placeholder="Select time"
          pos={110}
          handleSelect={handleSelectStudyTime}
        />
        <FormField
          title="Phone number"
          keyboardType="numeric"
          handleChangeText={(e) =>
            setAddInfoForm({ ...addInfoForm, phone_number: e })
          }
        />

        <TouchableOpacity
          style={[
            styles.btnSubmit,
            {
              backgroundColor: isSubmitting
                ? Colors.LIGHT_SECONDARY
                : Colors.SECONDARY,
            },
          ]}
          onPress={() =>
            addInfo(
              addInfoForm.full_name,
              addInfoForm.english_level,
              addInfoForm.daily_study_time,
              addInfoForm.phone_number,
              addInfoForm.gender
            )
          }
          activeOpacity={1.0}
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
    </Modal>
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
    marginTop: 20,
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
  btnSubmit: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 99,
  },
});

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";

export default function IntroScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/imgLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          The English Learning Application for everyone
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 15,
            gap: 10,
          }}
        >
          <Feather name="user" size={24} color={Colors.BLACK} />
          <Text style={{ fontFamily: "Poppins-Regular" }}>Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("signin")}
          style={{
            backgroundColor: Colors.SECONDARY,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 15,
            gap: 10,
          }}
        >
          <Feather name="lock" size={24} color={Colors.WHITE} />
          <Text style={{ fontFamily: "Poppins-Regular", color: Colors.WHITE }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require("../../assets/images/wave.png")}
          style={styles.imgWave}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.THIRD,
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  imgWave: {
    height: 50,
    width: Dimensions.get("screen").width,
    objectFit: "contain",
    marginTop: 100,
  },
  logo: {
    padding: 20,
    width: 350,
    height: 350,
  },
  title: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 20,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
    padding: 20,
  },
});

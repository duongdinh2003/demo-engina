import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddInfoModal from "../modals/AddInfoModal";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { isFirstSignIn } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginBottom: 50 }}>HomeScreen</Text>
      {isFirstSignIn && <AddInfoModal />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

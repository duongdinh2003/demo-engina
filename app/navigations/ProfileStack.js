import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="user-profile"
    >
      <Stack.Screen name="user-profile" component={ProfileScreen} />
      <Stack.Screen name="edit-profile" component={ProfileEditScreen} />
      <Stack.Screen name="change-password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

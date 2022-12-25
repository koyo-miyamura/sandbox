import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SignInScreen from "../screens/Auth/SignInScreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack

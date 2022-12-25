import React from "react";
import { NativeBaseProvider } from "native-base";
import { Platform, StatusBar } from "react-native";

import AppNavigator from "../navigation/AppNavigator";
import { Provider as AuthProvider } from "./AuthContext";

const Provider = () => {
  return (
    <NativeBaseProvider>
     <AuthProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
     </AuthProvider>
    </NativeBaseProvider>
  );
};

export default Provider;

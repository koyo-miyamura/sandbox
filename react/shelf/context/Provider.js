import React from "react";
import { NativeBaseProvider } from "native-base";
import { Platform, StatusBar } from "react-native";

import AppNavigator from "../navigation/AppNavigator";

const Provider = () => {
  return (
    <NativeBaseProvider>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default Provider;

import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export default AppNavigator = () => {
  const switcher = () => {
    if (true) {
      return AuthStack();
    } else {
      return MainStack();
    }
  };

  return <NavigationContainer>{switcher()}</NavigationContainer>;
};

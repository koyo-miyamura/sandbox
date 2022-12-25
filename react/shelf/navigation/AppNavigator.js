import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Context as AuthContext } from "../context/AuthContext"
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export default AppNavigator = () => {
  const {
    state: {token},
    initAuthState
  } = useContext(AuthContext)

  useEffect(() => {
    initAuthState();
  },[]);

  const switcher = () => {
    if (token === null) {
      return AuthStack();
    } else {
      return MainStack();
    }
  };

  return <NavigationContainer>{switcher()}</NavigationContainer>;
};

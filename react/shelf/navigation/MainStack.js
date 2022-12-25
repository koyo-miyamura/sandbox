import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Main/HomeScreen";
import SettingScreen from "../screens/Main/SettingScreen";

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

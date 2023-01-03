import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexScreen from "../screens/IndexScreen";
import NewScreen from "../screens/NewScreen";

const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Index"
                component={IndexScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="New"
                component={NewScreen}
                options={{ headerBackTitle: "Back" }}
            />
        </Stack.Navigator>
    );
};

export default MainStack;

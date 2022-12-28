import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./MainStack";

export const AppNavigator : React.FC = () => {
  return <NavigationContainer>{MainStack()}</NavigationContainer>;
};

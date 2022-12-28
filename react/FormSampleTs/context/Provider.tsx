import { NativeBaseProvider } from "native-base";
import { SafeAreaView, StatusBar, Platform, StyleSheet } from "react-native";

import { AppNavigator } from "../navigation/AppNavigator";

const Provider = () => {
  return (
    <SafeAreaView style={ styles.container } >
      <NativeBaseProvider>
        <StatusBar barStyle="default" />
        <AppNavigator />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Provider;

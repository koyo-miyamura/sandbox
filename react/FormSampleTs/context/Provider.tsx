import { NativeBaseProvider } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "../navigation/AppNavigator";

const Provider = () => {
  return (
    <SafeAreaView style={ styles.container } >
      <NativeBaseProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
});

export default Provider;

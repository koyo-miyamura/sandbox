import React from "react";
import { Box, Text, Button, VStack } from "native-base";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={"4xl"}>WelcomeScreen</Text>
      <VStack space={8} mt="4" w="80%">
        <Button
          w="100%"
          size="lg"
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In
        </Button>
        <Button
          w="100%"
          size="lg"
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default WelcomeScreen;

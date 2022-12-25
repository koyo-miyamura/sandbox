import React, { useState, useContext } from "react";
import { Box, Button, Input, Text, VStack } from "native-base";

import { Context as AuthContext } from "../../context/AuthContext";

const SignUpScreen = () => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box flex={1} alignItems="center" mt="40">
      <Text w="80%" textAlign={"start"} fontSize="2xl">
        SignUp
      </Text>
      <VStack w="80%" mt="8">
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          size="2xl"
          my="3"
          placeholder="email"
          w="100%"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          autoCapitalize="none"
          type="password"
          size="2xl"
          my="3"
          placeholder="password"
          w="100%"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button my="3" w="100%" onPress={() => signup(email, password)}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUpScreen;

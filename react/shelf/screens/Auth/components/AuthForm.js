import React, { useState } from "react";
import { Button, Input, VStack } from "native-base";

const AuthForm = ({action}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
      <Button my="3" w="100%" onPress={() => action(email, password)}>
        Submit
      </Button>
    </VStack>
  );
};

export default AuthForm;

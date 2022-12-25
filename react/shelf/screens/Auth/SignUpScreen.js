import React, { useContext } from "react";
import { Box, Text} from "native-base";

import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "./components/AuthForm";

const SignUpScreen = () => {
  const { signup } = useContext(AuthContext);

  return (
    <Box flex={1} alignItems="center" mt="40">
      <Text w="80%" textAlign={"start"} fontSize="2xl">
        SignUp
      </Text>
      <AuthForm action={signup} />
    </Box>
  );
};

export default SignUpScreen;

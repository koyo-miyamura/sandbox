import React, { useContext } from "react";
import { Box, Button, Text } from "native-base";

import { Context as AuthContext } from "../../context/AuthContext";

const SettingScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl">SettingScreen</Text>
      <Button
        width="80%"
        my="3"
        size="lg"
        colorScheme="danger"
        onPress={() => signout()}
      >
        Logout
      </Button>
    </Box>
  );
};

export default SettingScreen;

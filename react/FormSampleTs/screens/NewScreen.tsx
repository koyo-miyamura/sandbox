import { useState } from 'react';
import {
  VStack,
  Input,
  Button,
  FormControl,
  Box,
  Select,
  CheckIcon,
  TextArea
} from 'native-base';

type Props = {
  navigation: any;
};

const NewScreen : React.FC<Props> = ({navigation}) => {
  const [language, setLanguage] = useState("");

  const handleSubmit = () => {
    console.log(`submit! language=${language}`);
    navigation.navigate("Index");
  };
  return (
    <Box flex={1} alignItems="center" mt="2">
      <VStack width="80%" space={4}>
        <FormControl isRequired>
          <FormControl.Label>First Name</FormControl.Label>
          <Input
            placeholder="text"
          />
        </FormControl>
        <FormControl isRequired>
        <FormControl.Label>Select Language</FormControl.Label>
          <Select selectedValue={language} minWidth={200} accessibilityLabel="Select your favorite programming language" placeholder="Select your favorite programming language" onValueChange={itemValue => setLanguage(itemValue)} _selectedItem={{
            bg: "cyan.600",
            endIcon: <CheckIcon size={4} />
          }}>
            <Select.Item label="JavaScript" value="js" />
            <Select.Item label="TypeScript" value="ts" />
            <Select.Item label="C" value="c" />
            <Select.Item label="Python" value="py" />
            <Select.Item label="Java" value="java" />
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>自由記述</FormControl.Label>
          <TextArea h={20} placeholder="Text Area" autoCompleteType={false} />
        </FormControl>
        <Button onPress={() => handleSubmit()}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default NewScreen;

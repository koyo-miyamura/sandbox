import {
  VStack,
  Input,
  Button,
  FormControl,
  Box
} from 'native-base';

type Props = {
  navigation: any;
};

const NewScreen : React.FC<Props> = ({navigation}) => {
  const handleSubmit = () => {
    console.log("submit!");
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
        <Button onPress={() => handleSubmit()}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default NewScreen;

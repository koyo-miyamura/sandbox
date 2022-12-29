import {
  VStack,
  Input,
  Button,
  FormControl,
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
  );
};

export default NewScreen;

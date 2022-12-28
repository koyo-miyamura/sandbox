import { Box, Text, Button } from "native-base";

type Props = {
  navigation: any
}

const IndexScreen : React.FC<Props> = ({navigation}) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Index</Text>
      <Button
        onPress={() => navigation.navigate('New')}
      >
        New
      </Button>
    </Box>
  );
};

export default IndexScreen;

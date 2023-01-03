import {
    Box,
    Heading,
    FlatList,
    Pressable,
    Divider,
    VStack,
} from "native-base";

type Props = {
    navigation: any;
};

const IndexScreen: React.FC<Props> = ({ navigation }) => {
    const data = [...Array(3)].map((_, i) => ({
        id: i + 1,
        title: `data_${i + 1}`,
    }));
    return (
        <Box flex={1} alignItems="center" justifyContent="center" mt="10">
            <VStack width="80%" space="md">
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("New", { id: item.id })
                                }>
                                <Box
                                    flex={1}
                                    backgroundColor="white"
                                    py="4"
                                    px="4"
                                    alignItems="center"
                                    justifyContent="center">
                                    <Heading fontSize="xl">{`${item.id}: ${item.title}`}</Heading>
                                </Box>
                            </Pressable>
                            <Divider thickness={2} />
                        </>
                    )}
                />
            </VStack>
        </Box>
    );
};

export default IndexScreen;

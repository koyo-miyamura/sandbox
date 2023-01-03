import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    FlatList,
    Pressable,
    Divider,
    VStack,
    HStack,
    Spinner,
} from "native-base";

type Props = {
    navigation: any;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getData = () => {
    // 3要素のダミーデータ
    const data = [...Array(3)].map((_, i) => ({
        id: i + 1,
        title: `data_${i + 1}`,
    }));

    // 疑似的に３秒待ってデータ取得する関数
    const getApiData = () =>
        new Promise<typeof data>((resolve) => {
            resolve(data);
        });
    return Promise.all([getApiData(), sleep(3000)]);
};

const IndexScreen: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [data, setData] = useState<{ id: number; title: string }[]>([]);

    useEffect(() => {
        (async () => {
            const apiData = await getData();
            setData(apiData[0]);
            setLoading(false);
        })();
    }, []);

    return (
        <Box flex={1} alignItems="center" justifyContent="center" mt="10">
            {loading && (
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            )}
            {!loading && (
                <VStack width="80%" space="md">
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("New", {
                                            id: item.id,
                                        })
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
            )}
        </Box>
    );
};

export default IndexScreen;

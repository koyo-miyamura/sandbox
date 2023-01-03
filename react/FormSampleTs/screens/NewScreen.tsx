import { useState } from "react";
import {
    VStack,
    Input,
    Button,
    FormControl,
    Box,
    Select,
    CheckIcon,
    TextArea,
} from "native-base";
import { useForm, Controller } from "react-hook-form";

type Props = {
    navigation: any;
};

type FormData = {
    firstName: string;
};

const NewScreen: React.FC<Props> = ({ navigation }) => {
    const [language, setLanguage] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            firstName: "",
        },
    });
    const onSubmit = (data: FormData) => {
        console.log("submiting with: ", data);
        navigation.navigate("Index");
    };

    console.log("errors", errors);

    return (
        <Box flex={1} alignItems="center" mt="2">
            <VStack width="80%" space={4}>
                <FormControl isRequired isInvalid={"firstName" in errors}>
                    <FormControl.Label>First Name</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder="text"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="firstName"
                        rules={{ required: true }}
                    />
                    {errors.firstName && (
                        <FormControl.ErrorMessage>
                            これは必須です
                        </FormControl.ErrorMessage>
                    )}
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>Select Language</FormControl.Label>
                    <Select
                        selectedValue={language}
                        minWidth={200}
                        accessibilityLabel="Select your favorite programming language"
                        placeholder="Select your favorite programming language"
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,
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
                    <TextArea
                        h={20}
                        placeholder="Text Area"
                        autoCompleteType={false}
                    />
                </FormControl>
                <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
            </VStack>
        </Box>
    );
};

export default NewScreen;

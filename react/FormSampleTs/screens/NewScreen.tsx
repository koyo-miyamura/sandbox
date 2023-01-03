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
    language: string;
};

const NewScreen: React.FC<Props> = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            firstName: "koyo",
            language: "",
        },
    });
    const onSubmit = (data: FormData) => {
        console.log("submiting with: ", data);

        if (data.language === "") {
            setError("language", { type: "required" });
        } else if (data.language === "invalid") {
            setError("language", { type: "invalid" });
        } else {
            navigation.navigate("Index");
        }
    };

    console.log("errors", errors);

    return (
        <Box flex={1} alignItems="center" mt="2">
            <VStack width="80%" space={4}>
                <FormControl isRequired isInvalid={"firstName" in errors}>
                    <FormControl.Label>
                        First Name（rules でバリデーション）
                    </FormControl.Label>
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
                <FormControl isRequired isInvalid={"language" in errors}>
                    <FormControl.Label>
                        Select Language（Submit 後にバリデーション）
                    </FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                selectedValue={value}
                                minWidth={200}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Select your favorite programming language"
                                onValueChange={(itemValue) =>
                                    onChange(itemValue)
                                }
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}>
                                <Select.Item label="JavaScript" value="js" />
                                <Select.Item label="TypeScript" value="ts" />
                                <Select.Item
                                    label="Invalid language"
                                    value="invalid"
                                />
                            </Select>
                        )}
                        name="language"
                    />
                    {errors.language?.type === "required" && (
                        <FormControl.ErrorMessage>
                            これは必須です
                        </FormControl.ErrorMessage>
                    )}
                    {errors.language?.type === "invalid" && (
                        <FormControl.ErrorMessage>
                            不正な言語です
                        </FormControl.ErrorMessage>
                    )}
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

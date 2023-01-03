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

const Languages = {
    blank: "",
    javascript: "js",
    typescript: "ts",
    invalid: "invalid",
} as const;

type FormData = {
    firstName: string;
    language: typeof Languages[keyof typeof Languages];
    freeText: string;
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
            language: Languages.blank,
            freeText: "free text",
        },
    });
    const onSubmit = (data: FormData) => {
        console.log("submiting with: ", data);

        if (data.language === Languages.blank) {
            setError("language", { type: "required" });
        } else if (data.language === Languages.invalid) {
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
                                bg={errors.firstName && "error.100"}
                                borderColor={errors.firstName && "error.600"}
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
                                bg={errors.language && "error.100"}
                                borderColor={errors.language && "error.600"}
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
                                <Select.Item
                                    label="JavaScript"
                                    value={Languages.javascript}
                                />
                                <Select.Item
                                    label="TypeScript"
                                    value={Languages.typescript}
                                />
                                <Select.Item
                                    label="Invalid language"
                                    value={Languages.invalid}
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

                <FormControl isRequired isInvalid={"freeText" in errors}>
                    <FormControl.Label>
                        自由記述（rules でバリデーション）
                    </FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextArea
                                bg={errors.freeText && "error.100"}
                                borderColor={errors.freeText && "error.600"}
                                placeholder="TextArea"
                                onChangeText={onChange}
                                defaultValue={value}
                                autoCompleteType={false}
                            />
                        )}
                        name="freeText"
                        rules={{ required: true }}
                    />
                    {errors.freeText && (
                        <FormControl.ErrorMessage>
                            これは必須です
                        </FormControl.ErrorMessage>
                    )}
                </FormControl>

                <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
            </VStack>
        </Box>
    );
};

export default NewScreen;

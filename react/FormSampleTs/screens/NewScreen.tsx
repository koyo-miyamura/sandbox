import {
    VStack,
    Input,
    Button,
    FormControl,
    Box,
    Select,
    CheckIcon,
    TextArea,
    Pressable,
    Text,
    ScrollView,
    HStack,
    Link,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import {
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
} from "react-native";
import { useStorage } from "../hooks/useStorage";
import { updateStorageData, removeStorageData } from "../lib/storage";
import { formatDate, formatTime } from "../lib/dateformat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

type Props = {
    route: any;
    navigation: any;
};

const Languages = {
    JavaScript: "js",
    TypeScript: "ts",
    Elixir: "elixir",
    "Invalid language": "invalid",
} as const;

type FormData = {
    firstName?: string;
    language?: typeof Languages[keyof typeof Languages];
    freeText?: string;
    date?: string;
    time?: string;
    files?: FileInfo[];
};

type FileInfo = {
    name: string;
    size?: number | undefined;
    uri: string;
    mimeType?: string | undefined;
};

const NewScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id } = route.params;
    const formData = useStorage(id);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    console.log(`formData: ${JSON.stringify(formData)}`);

    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        values: formData,
    });
    const onSubmit = async (data: FormData) => {
        console.log("submiting with: ", data);
        data.files?.forEach(async (file) => {
            try {
                const fileContent = await FileSystem.readAsStringAsync(
                    file.uri,
                    {
                        encoding: FileSystem.EncodingType.Base64,
                    },
                );
                console.log(fileContent.length);
            } catch (e) {
                console.log(e);
            }
        });

        if (data.language == null) {
            setError("language", { type: "required" });
        } else if (data.language === Languages["Invalid language"]) {
            setError("language", { type: "invalid" });
        } else {
            // アップロードに成功したらデータ削除する
            removeStorageData(id);
            navigation.navigate("Index");
        }
    };

    const handleForcusOut = (
        e: NativeSyntheticEvent<TextInputEndEditingEventData>,
        formKey: keyof FormData,
    ) => {
        console.log("nativeEvent", e.nativeEvent);
        updateFormStorageData(formKey, e.nativeEvent.text);
    };

    const updateFormStorageData = (
        formKey: keyof FormData,
        itemValue: string | Object,
    ) => {
        const savedData = { [formKey]: itemValue };
        console.log("saved!", id, savedData);
        updateStorageData(id, savedData);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const isValueBlank = (value: string | undefined) =>
        value == null || value === "";

    const handleFileUploadButton = async (
        onChange: (...event: any[]) => void,
    ) => {
        // 自前で setError するので事前に clearErrors する
        clearErrors("files");

        const prevFiles = getValues("files") ?? [];
        if (prevFiles.length === 5) {
            setError("files", { message: "ファイルは5つまで添付できます" });
            return;
        }

        const file = await DocumentPicker.getDocumentAsync();
        if (file.type === "success") {
            const newFiles = prevFiles.concat(file);
            const totalSize = newFiles.reduce(
                (acc, file) => (acc += file.size ?? 0),
                0,
            );
            if (totalSize > 100_000_000) {
                setError("files", {
                    message: "ファイルの合計サイズは100MBです",
                });
                return;
            }
            updateFormStorageData("files", newFiles);
            onChange(newFiles);
        }
    };

    const handleFileDelete = (
        file: FileInfo,
        onChange: (...event: any[]) => void,
    ) => {
        // 自前で setError するので事前に clearErrors する
        clearErrors("files");

        const prevFiles = getValues("files") ?? [];
        const newFiles = prevFiles.filter((f) => f.uri !== file.uri);
        updateFormStorageData("files", newFiles);
        onChange(newFiles);
    };

    console.log("errors", errors);

    return (
        <ScrollView>
            <Box flex={1} alignItems="center" mt="2">
                <VStack width="80%" space={4}>
                    <FormControl isRequired isInvalid={"firstName" in errors}>
                        <FormControl.Label>
                            First Name（rules でバリデーション）
                        </FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    bg={errors.firstName && "error.100"}
                                    borderColor={
                                        errors.firstName && "error.600"
                                    }
                                    placeholder="text"
                                    onEndEditing={(e) =>
                                        handleForcusOut(e, "firstName")
                                    }
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
                                    onValueChange={(itemValue) => {
                                        updateFormStorageData(
                                            "language",
                                            itemValue,
                                        );
                                        onChange(itemValue);
                                    }}
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} />,
                                    }}>
                                    {Object.entries(Languages).map(
                                        ([languageLabel, languageValue]) => {
                                            return (
                                                <Select.Item
                                                    key={languageLabel}
                                                    label={languageLabel}
                                                    value={languageValue}
                                                />
                                            );
                                        },
                                    )}
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
                                    onEndEditing={(e) =>
                                        handleForcusOut(e, "freeText")
                                    }
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

                    <FormControl isRequired isInvalid={"date" in errors}>
                        <FormControl.Label>日付</FormControl.Label>

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Pressable onPress={showDatePicker}>
                                        {/* refs: https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/components/input.ts */}
                                        <Text
                                            borderWidth="1"
                                            bg={errors.date && "error.100"}
                                            borderColor={
                                                errors.date
                                                    ? "error.500"
                                                    : "muted.300"
                                            }
                                            py="2"
                                            px="3"
                                            borderRadius="sm"
                                            color={
                                                isValueBlank(value)
                                                    ? "text.400"
                                                    : "text.900"
                                            }>
                                            {isValueBlank(value)
                                                ? "年/月/日"
                                                : value}
                                        </Text>
                                    </Pressable>

                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        locale="ja_JP"
                                        onConfirm={(date) => {
                                            const formatedDate =
                                                formatDate(date);
                                            console.log(
                                                "A date has been picked: ",
                                                formatedDate,
                                            );
                                            hideDatePicker();
                                            updateFormStorageData(
                                                "date",
                                                formatedDate,
                                            );
                                            onChange(formatedDate);
                                        }}
                                        onCancel={() => {
                                            hideDatePicker();
                                            updateFormStorageData("date", "");
                                            onChange("");
                                        }}
                                    />
                                </>
                            )}
                            name="date"
                            rules={{ required: true }}
                        />
                        {errors.date && (
                            <FormControl.ErrorMessage>
                                これは必須です
                            </FormControl.ErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"time" in errors}>
                        <FormControl.Label>時刻</FormControl.Label>

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Pressable onPress={showTimePicker}>
                                        {/* refs: https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/components/input.ts */}
                                        <Text
                                            borderWidth="1"
                                            bg={errors.time && "error.100"}
                                            borderColor={
                                                errors.time
                                                    ? "error.500"
                                                    : "muted.300"
                                            }
                                            py="2"
                                            px="3"
                                            borderRadius="sm"
                                            color={
                                                isValueBlank(value)
                                                    ? "text.400"
                                                    : "text.900"
                                            }>
                                            {isValueBlank(value)
                                                ? "-- : --"
                                                : value}
                                        </Text>
                                    </Pressable>

                                    <DateTimePickerModal
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        locale="ja_JP"
                                        onConfirm={(date) => {
                                            const formatedTime =
                                                formatTime(date);
                                            console.log(
                                                "A time has been picked: ",
                                                formatedTime,
                                            );
                                            hideTimePicker();
                                            updateFormStorageData(
                                                "time",
                                                formatedTime,
                                            );
                                            onChange(formatedTime);
                                        }}
                                        onCancel={() => {
                                            hideTimePicker();
                                            updateFormStorageData("time", "");
                                            onChange("");
                                        }}
                                    />
                                </>
                            )}
                            name="time"
                            rules={{ required: true }}
                        />
                        {errors.time && (
                            <FormControl.ErrorMessage>
                                これは必須です
                            </FormControl.ErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isInvalid={"files" in errors}>
                        <FormControl.Label>
                            添付ファイル（５つまで）
                        </FormControl.Label>

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <VStack mt={2} space="4">
                                    <Button
                                        onPress={() => {
                                            handleFileUploadButton(onChange);
                                        }}>
                                        File
                                    </Button>

                                    {value?.map((file, i) => {
                                        return (
                                            <HStack
                                                key={String(i)}
                                                flex="1"
                                                justifyContent="space-between">
                                                <Text fontSize="11">
                                                    {file.name}
                                                </Text>
                                                <Link
                                                    onPress={() =>
                                                        handleFileDelete(
                                                            file,
                                                            onChange,
                                                        )
                                                    }>
                                                    削除
                                                </Link>
                                            </HStack>
                                        );
                                    })}
                                </VStack>
                            )}
                            name="files"
                        />
                        {errors.files && (
                            <FormControl.ErrorMessage>
                                {errors.files.message}
                            </FormControl.ErrorMessage>
                        )}
                    </FormControl>
                    <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default NewScreen;

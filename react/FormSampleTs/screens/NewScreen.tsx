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
    Image,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import {
    Alert,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
} from "react-native";
import { useStorage } from "../hooks/useStorage";
import { updateStorageData, removeStorageData } from "../lib/storage";
import { formatDate, formatTime } from "../lib/dateformat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
    readBase64FileAsync,
    generateFileUri,
    writeBase64FileAsync,
    deleteFileAsync,
    copyAsync,
    getInfoAsync,
} from "../lib/fileutil";
import * as ImagePicker from "expo-image-picker";
import * as Mime from "mime";
import { Picker } from "@react-native-picker/picker";

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
    language2?: typeof Languages[keyof typeof Languages];
    freeText?: string;
    date?: string;
    time?: string;
    files?: FileInfo[];
    images?: ImageInfo[];
};

type FileInfo = {
    name: string;
    size?: number;
    uri: string;
    mimeType?: string;
};

type ImageInfo = {
    size?: number;
    uri: string;
    mimeType?: string;
};

type uploadedImages = {
    size?: number;
    uriFrom: string;
    uriTo: string;
    mimeType?: string;
};

const ALLOWED_MIME = [
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/heif",
    "image/heif-sequence",
    "image/heic-sequence",
];

const NewScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id } = route.params;
    const formData = useStorage(id);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [permission, requestPermission] = ImagePicker.useCameraPermissions();

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
                const fileContent = await readBase64FileAsync(file.uri);
                console.log(fileContent.length);
            } catch (e) {
                console.log(e);
            }
        });

        data.images?.forEach(async (image) => {
            try {
                const imageContent = await readBase64FileAsync(image.uri);
                console.log(imageContent.length);
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
            data.files?.forEach((file) => deleteFileAsync(file.uri));
            data.images?.forEach((file) => deleteFileAsync(file.uri));
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
            // getDocumentAsync で取得した uri を基に base64 エンコードしたファイルデータを取得
            const fileContent = await readBase64FileAsync(file.uri);
            // uri をローカルファイルストレージのものに差し替える
            file.uri = generateFileUri();

            const newFiles = prevFiles.concat(file);

            // ファイルサイズバリデーション
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

            // documentDirectory に保存することで永続化する
            // https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemdocumentdirectory
            writeBase64FileAsync(file.uri, fileContent);
            updateFormStorageData("files", newFiles);
            onChange(newFiles);
        }
    };

    const handleFileDelete = async (
        file: FileInfo,
        onChange: (...event: any[]) => void,
    ) => {
        // 自前で setError するので事前に clearErrors する
        clearErrors("files");

        const prevFiles = getValues("files") ?? [];
        const newFiles = prevFiles.filter((f) => f.uri !== file.uri);
        updateFormStorageData("files", newFiles);
        deleteFileAsync(file.uri);
        onChange(newFiles);
    };

    const handleImageUploadButton = (onChange: (...event: any[]) => void) => {
        Alert.alert(
            "カメラ or 写真",
            "選択してください",
            [
                { text: "カメラ", onPress: () => handleCameraUpload(onChange) },
                {
                    text: "写真",
                    onPress: () => handlePictureUpload(onChange),
                },
            ],
            { cancelable: false },
        );
    };

    const handlePictureUpload = async (onChange: (...event: any[]) => void) => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: 10, // ios14以上のみ有効
        });

        handleUploadedImage(image, onChange);
    };

    const handleCameraUpload = async (onChange: (...event: any[]) => void) => {
        // ここでカメラ許可のチェック
        if (!permission?.granted) {
            await requestPermission();
        }
        if (!permission?.granted) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            selectionLimit: 10, // ios14以上のみ有効
        });

        handleUploadedImage(image, onChange);
    };

    const handleUploadedImage = async (
        image: ImagePicker.ImagePickerResult,
        onChange: (...event: any[]) => void,
    ) => {
        // 自前で setError するので事前に clearErrors する
        clearErrors("images");

        if (image.canceled) {
            return;
        }

        const prevImages = getValues("images") ?? [];

        // ファイル添付上限チェック
        if (prevImages.length + image.assets.length > 10) {
            setError("images", {
                message: "写真は10まで添付できます",
            });
            return;
        }

        let uploadedImages: uploadedImages[] = [];
        let isOverFileSizeLimit = false; // ファイル1件当たりのファイルサイズ
        let isValidMime = true; // 拡張子チェック

        // ここ Promise.all で全て終わるまで待つ必要がある
        await Promise.all(
            image.assets.map(async (asset) => {
                // ファイルサイズが Android だと ImagePicker から取れないので取得
                const info = await getInfoAsync(asset.uri);

                // 1ファイルあたりのファイルサイズバリデーション
                if (info.size && info.size > 300_000_000) {
                    isOverFileSizeLimit = true;
                }

                // 拡張子バリデーション
                const mimeType = Mime.getType(asset.uri) ?? "";
                if (!ALLOWED_MIME.includes(mimeType)) {
                    isValidMime = false;
                }

                uploadedImages.push({
                    size: info.size,
                    uriFrom: asset.uri,
                    uriTo: generateFileUri(),
                    mimeType: mimeType,
                });
            }),
        );

        if (isOverFileSizeLimit) {
            setError("images", {
                message: "1写真の最大サイズは300MBです",
            });
            return;
        }

        if (!isValidMime) {
            setError("images", {
                message: "jpg,png,heic のいずれかを添付してください",
            });
            return;
        }

        const newImages = prevImages.concat(
            uploadedImages.map((i) => {
                return {
                    size: i.size,
                    uri: i.uriTo,
                    mimeType: i.mimeType,
                };
            }),
        );

        // 合計のファイルサイズバリデーション
        const totalSize = newImages.reduce(
            (acc, image) => (acc += image.size ?? 0),
            0,
        );
        if (totalSize > 500_000_000) {
            setError("images", {
                message: "写真の合計サイズは500MBです",
            });
            return;
        }

        // 保存
        // ここ Promise.all で全て終わるまで待つ必要がある
        await Promise.all(
            uploadedImages.map(async (image) => {
                await copyAsync(image.uriFrom, image.uriTo);
            }),
        );

        updateFormStorageData("images", newImages);
        onChange(newImages);
    };

    const handleImageDelete = async (
        image: ImageInfo,
        onChange: (...event: any[]) => void,
    ) => {
        // 自前で setError するので事前に clearErrors する
        clearErrors("images");

        const prevImages = getValues("images") ?? [];
        const newFiles = prevImages.filter((i) => i.uri !== image.uri);
        updateFormStorageData("images", newFiles);
        deleteFileAsync(image.uri);
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

                    <FormControl isRequired isInvalid={"language2" in errors}>
                        <FormControl.Label>
                            Select Language2（バリデーションなし）
                        </FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue, _itemIndex) =>
                                        onChange(itemValue)
                                    }>
                                    {Object.entries(Languages).map(
                                        ([languageLabel, languageValue]) => {
                                            return (
                                                <Picker.Item
                                                    key={languageLabel}
                                                    label={languageLabel}
                                                    value={languageValue}
                                                />
                                            );
                                        },
                                    )}
                                </Picker>
                            )}
                            name="language2"
                        />
                        {errors.language2?.type === "required" && (
                            <FormControl.ErrorMessage>
                                これは必須です
                            </FormControl.ErrorMessage>
                        )}
                        {errors.language2?.type === "invalid" && (
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

                    <FormControl isInvalid={"images" in errors}>
                        <FormControl.Label>写真（10つまで）</FormControl.Label>

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <VStack mt={2} space="4">
                                    <Button
                                        onPress={() => {
                                            handleImageUploadButton(onChange);
                                        }}>
                                        Image
                                    </Button>

                                    <HStack flex="1" flexWrap="wrap">
                                        {value?.map((image, i) => {
                                            return (
                                                <VStack
                                                    space="2"
                                                    key={String(i)}
                                                    width="25%">
                                                    <Image
                                                        source={{
                                                            uri: image.uri,
                                                        }}
                                                        alt="alt"
                                                        size="sm"
                                                    />
                                                    <Link
                                                        onPress={() =>
                                                            handleImageDelete(
                                                                image,
                                                                onChange,
                                                            )
                                                        }>
                                                        削除
                                                    </Link>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </VStack>
                            )}
                            name="images"
                        />

                        {errors.images && (
                            <FormControl.ErrorMessage>
                                {errors.images.message}
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

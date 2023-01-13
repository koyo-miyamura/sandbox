import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

const FILE_DIR = `${FileSystem.documentDirectory}/FormSampleTs/formData`;

export const readBase64FileAsync = async (fileUri: string) => {
    return await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

// 拡張子入れてもいいかも
export const generateFileUri = () => `${FILE_DIR}/${uuid.v4()}`;

export const writeBase64FileAsync = async (
    key: string,
    fileContent: string,
) => {
    await ensureDirExists(FILE_DIR);
    await FileSystem.writeAsStringAsync(key, fileContent);
};

export const deleteFileAsync = async (fileUri: string) => {
    await FileSystem.deleteAsync(fileUri, {
        idempotent: true,
    });
};

const ensureDirExists = async (dirName: string) => {
    const dirInfo = await FileSystem.getInfoAsync(dirName);

    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirName, { intermediates: true });
    }
};

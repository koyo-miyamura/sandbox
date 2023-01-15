import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

// documentDirectory に保存することで永続化できる
// https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemdocumentdirectory
const FILE_DIR = `${FileSystem.documentDirectory}FormSampleTs/formData`;

export const readBase64FileAsync = async (fileUri: string) => {
    return await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

// 拡張子入れてもいいかも
export const generateFileUri = () => `${FILE_DIR}/${uuid.v4()}`;

export const writeBase64FileAsync = async (
    uri: string,
    fileContent: string,
) => {
    await ensureDirExists(FILE_DIR);
    await FileSystem.writeAsStringAsync(uri, fileContent);
};

export const copyAsync = async (from: string, to: string) => {
    await ensureDirExists(FILE_DIR);
    await FileSystem.copyAsync({
        from: from,
        to: to,
    });
};

export const getInfoAsync = async (uri: string) => {
    return await FileSystem.getInfoAsync(uri, {
        size: true,
    });
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

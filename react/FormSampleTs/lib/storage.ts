import AsyncStorage from "@react-native-async-storage/async-storage";

export type KeyType = number | string;

const buildStorageKey = (key: KeyType) => `storage_data_${key}`;

export const getStorageData = async (key: KeyType) => {
    const jsonValue = await AsyncStorage.getItem(buildStorageKey(key));
    return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export const updateStorageData = async (key: KeyType, data: Object) => {
    await AsyncStorage.mergeItem(buildStorageKey(key), JSON.stringify(data));
};

export const removeStorageData = async (key: KeyType) => {
    await AsyncStorage.removeItem(buildStorageKey(key));
};

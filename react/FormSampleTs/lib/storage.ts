import AsyncStorage from "@react-native-async-storage/async-storage";

export type IDType = number | string;

const buildStorageKey = (id: IDType) => `storage_data_${id}`;

export const getStorageData = async (id: IDType) => {
    const jsonValue = await AsyncStorage.getItem(buildStorageKey(id));
    return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export const updateStorageData = async (id: IDType, data: Object) => {
    await AsyncStorage.mergeItem(buildStorageKey(id), JSON.stringify(data));
};

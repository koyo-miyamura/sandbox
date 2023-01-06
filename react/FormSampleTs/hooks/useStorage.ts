import { useState, useEffect } from "react";
import { getStorageData, KeyType } from "../lib/storage";

export const useStorage = (key: KeyType) => {
    const [storageData, setStorageData] = useState<Object>({});

    useEffect(() => {
        (async () => {
            const data = await getStorageData(key);
            setStorageData(data);
            console.log(`storageData: ${JSON.stringify(data)}`);
        })();
    }, []);

    return storageData;
};

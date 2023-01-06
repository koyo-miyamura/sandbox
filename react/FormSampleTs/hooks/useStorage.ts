import { useState, useEffect } from "react";
import { getStorageData, IDType } from "../lib/storage";

export const useStorage = (id: IDType) => {
    const [storageData, setStorageData] = useState<Object>({});

    useEffect(() => {
        (async () => {
            const data = await getStorageData(id);
            setStorageData(data);
            console.log(`storageData: ${JSON.stringify(data)}`);
        })();
    }, []);

    return storageData;
};

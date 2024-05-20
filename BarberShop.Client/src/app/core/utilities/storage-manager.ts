import { environment } from "src/environments/environment";
import { StorageKey } from '../../shared/enum/storage-key-enum';

export class StorageManager {
    static set(key: StorageKey, date) {
        const jsonData = JSON.stringify(date);

        localStorage.setItem(`${environment.appName}_${key}`, jsonData);
    }

    static get(key: StorageKey) {
        let data;

        const jsonData = localStorage.getItem(`${environment.appName}_${key}`);
        if (jsonData) {
            data = JSON.parse(jsonData);
        }

        return data;
    }

    static remove(key: StorageKey) {
        localStorage.removeItem(`${environment.appName}_${key}`);
    }
}

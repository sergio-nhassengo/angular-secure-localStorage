import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'E0187Q}G*w_4k)q.@UFSUojUOAtjgq';

@Injectable()
export class StorageService {
    
    constructor() { }

    getData<T>(key: string): T {
        let encryptedData = localStorage.getItem(key);
        let decryptedData = this._decryptData(encryptedData);
        return JSON.parse(decryptedData);
    }

    setData<T>(key: string, data: T) {
        let stringifiedData = JSON.stringify(data);
        let encrypted = this._encryptData(stringifiedData);
        localStorage.setItem(key, encrypted);
    }
    
    removeData(key: string) {
        localStorage.removeItem(key);
    }

    private _encryptData(data) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        } catch (e) {
            console.log(e);
        }
    }

    private _decryptData(data) {
        try {
            const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }
}
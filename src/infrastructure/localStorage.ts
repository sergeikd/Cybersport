import { ILocalStorageProvider } from "../common/interfaces";

export class LocalStorageProvider implements ILocalStorageProvider {
    hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    putObject = (key: string, obj: any):void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getObject = (key: string): {} => {
        const obj: string | null = localStorage.getItem(key);
        return obj === null ? null : JSON.parse(obj);
    }
}
interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: any) => void;
    getObject: (key: string) => {};
}

export class LocalStorageProvider implements ILocalStorageProvider {
    hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    putObject = (key: string, obj: any):void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getObject = (key: string): {} => {
        return JSON.parse(localStorage.getItem(key));
    }
}
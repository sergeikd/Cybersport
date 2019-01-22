import { IUser, ILocalStorageProvider } from "../common/interfaces";

export class LocalStorageProvider implements ILocalStorageProvider {
    hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    putObject = (key: string, obj: {}): void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getUser = (name: string): IUser | null => {
        const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
        const user: IUser | undefined = users.find(x => x.name === name);
        return user === undefined ? null : user;
    }
}
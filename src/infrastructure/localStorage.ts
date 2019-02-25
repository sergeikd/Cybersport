import { IUser } from "../common/interfaces";

export class LocalStorageProvider {
    hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    putObject = (key: string, obj: object): void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getUser = (name: string): IUser | undefined => {
        const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
        return users.find(x => x.name === name);
    }

    hasUser = (name: string): boolean => {
        const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
        return users.find(x => x.name === name) === undefined;
    }
}
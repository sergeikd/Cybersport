import { IUser, IState } from "../common/interfaces";

export class LocalStorageProvider {
    hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    putObject = (key: string, obj: object): void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getUser = (name: string): IUser | undefined => {
        const users: IUser[] = this.get<IUser[]>("users");
        return users.find(x => x.name === name);
    }

    // getUsers = (): IUser[] => {
    //     const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
    //     return users;
    // }

    get<T> (instance: string): T {
        return JSON.parse(localStorage.getItem(instance)!);
    }

    hasUser = (name: string): boolean => {
        const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
        return users.find(x => x.name === name) === undefined;
    }

    saveUsers = (users: IUser[]) => {
        this.putObject("users", users);
    }
}
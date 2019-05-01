import { IUser, IGame, ILocalStorageProvider } from "../common/interfaces";

export class LocalStorageProvider implements ILocalStorageProvider {

    public hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    public putObject = (key: string, obj: object): void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    public getUser = (name: string): Promise<IUser> => {
        const users: IUser[] = this.get<IUser[]>("users");
        return new Promise<IUser>((resolve) => {
            return resolve(users.find(x => x.name === name));
        });
    }

    public get<T> (instance: string): T {
        return JSON.parse(localStorage.getItem(instance)!);
    }

    public save<T> (key: string, payload: T): void {
        localStorage.setItem(key, JSON.stringify(payload));
    }

    public getGames = () => {
        return new Promise<IGame[]>((resolve) => {
            return resolve(JSON.parse(localStorage.getItem("games")!));
        });
    }
}
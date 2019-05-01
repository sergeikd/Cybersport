import { IUser, IGame, ILocalStorageProvider } from "../common/interfaces";

export class LocalStorageProvider implements ILocalStorageProvider {

    public hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    public putObject = (key: string, obj: object): void => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    public getUser = (name: string): IUser | undefined => {
        const users: IUser[] = this.get<IUser[]>("users");
        return users.find(x => x.name === name);
    }

    public get<T> (instance: string): T {
        return JSON.parse(localStorage.getItem(instance)!);
    }

    public hasUser = (name: string): boolean => {
        const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
        return users.find(x => x.name === name) === undefined;
    }

    public saveUsers = (users: IUser[]) => {
        this.putObject("users", users);
    }

    public getGames = () => {
        return new Promise<IGame[]>((resolve) => {
            return resolve(JSON.parse(localStorage.getItem("games")!));
        });
    }
}
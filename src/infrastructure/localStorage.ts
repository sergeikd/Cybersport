import { IUser, IGame, ILocalStorageProvider } from "../common/interfaces";
import * as instances from "../common/instances";
export class LocalStorageProvider implements ILocalStorageProvider {

    public hasObject = (key: string): boolean => {
        return localStorage.getItem(key) !== null;
    }

    public get<T>(instance: string): Promise<T> {
        return new Promise<T>((resolve) => {
            return resolve(JSON.parse(localStorage.getItem(instance)!));
        });
        // return JSON.parse(localStorage.getItem(instance)!);
    }

    public getSingle<T>(instance: string, property: keyof T, value: string): Promise<T> {
        const items: T[] = JSON.parse(localStorage.getItem(instance)!);
        const item: T = items.find(x => x[property].toString() === value)!;
        return new Promise<T>((resolve) => {
            return resolve(item);
        });
    }


    public save<T>(key: string, payload: T): void {
        localStorage.setItem(key, JSON.stringify(payload));
    }

    public getGames = () => {
        return new Promise<IGame[]>((resolve) => {
            return resolve(JSON.parse(localStorage.getItem("games")!));
        });
    }
}
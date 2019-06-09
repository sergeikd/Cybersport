import { IApiProvider } from "../common/interfaces";
import { data } from "../appData/defaultData";

interface IData {
    [key: string]: any;
}
export class ApiProvider implements IApiProvider {

    public get<T>(instance: string): Promise<T> {
        return new Promise<T>((resolve) => {
            return resolve(JSON.parse(localStorage.getItem(instance)!));
        });
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

    public initLocalStorage(): void {
        const initData: IData = { ...data };
        for (const key in { ...data }) {
            if (data.hasOwnProperty(key) && localStorage.getItem(key) === null) {
                this.save(key, initData[key]);
            }
        }
    }
}
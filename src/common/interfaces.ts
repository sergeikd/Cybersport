export interface IUser {
    id: number;
    name: string;
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: any) => void;
    getObject: (key: string) => {} | null;
}
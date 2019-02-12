export interface IUser {
    id: number;
    name: string;
    roleId: number;
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: object) => void;
    getUser: (name: string) => IUser | null;
}
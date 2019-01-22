export interface IUser {
    id: number;
    name: string;
    role: string;
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: {}) => void;
    getUser: (name: string) => IUser | null;
}
export interface IUser {
    id: number;
    name: string;
    roleId: number;
    isActive: boolean;
}

export interface IState {
    user: IUser;
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: object) => void;
    getUser: (name: string) => IUser | undefined;
    hasUser: (key: string) => boolean;
}

export interface ILoginProvider {
    getUser: () => IUser;
    isLogged: () => boolean;
    logout: () => void;
    login: (name: string) => void;
    isUserExists: (name: string) => boolean;
}
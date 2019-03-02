export interface IUser {
    id: number;
    name: string;
    roleId: number;
    isActive: boolean;
}

export interface IState {
    users: {
        loggedUser: IUser,
        userList: IUser[]
    };
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: object) => void;
    getUser: (name: string) => IUser | undefined;
    hasUser: (key: string) => boolean;
    saveUsers: (users: IUser[]) => void;
    get<T> (instance: string): T;
}
export interface IUser {
    id: number;
    name: string;
    roleId: number;
}

export interface IState {
    [key: string]: any;
}

// export interface IAction {
//     type: string;
//     payload: any;
//     [key: string]: any;
// }

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: object) => void;
    getUser: (name: string) => IUser | null;
}

export interface ILoginProvider {
    getUser: () => IUser;
    isLogged: () => boolean;
    logout: () => void;
    login: (name: string) => void;
    isUserExists: (name: string) => boolean;
}
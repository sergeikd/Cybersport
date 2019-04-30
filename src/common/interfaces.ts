export interface IUser {
    id: number;
    name: string;
    roleId: number;
    isActive: boolean;
}

export interface IRole {
    id: number;
    role: string;
}

export interface IGame {
    id: number;
    name: string;
    backgroundImage: string;
}

export interface IState {
    users: {
        loggedUser: IUser,
        userList: IUser[],
        roles: IRole[],
    };
}

export interface INews {
    id: number;
    text: string;
    pictureUrl: string;
    gameId:  number;
    authorId:  number;
}

export interface IUserState {
    users: {
        loggedUser: IUser,
        userList: IUser[],
        roles: IRole[],
    };
}

export interface IGamesState {
    games: {
        gamesList: IGame[],
    };
    users: {
        loggedUser: IUser,
    };
}

export interface INewsState {
    newsList: INews[];
}

export interface IAction {
    type: string;
    payload: any;
    [key: string]: any;
}

export interface ILocalStorageProvider {
    hasObject: (key: string) => boolean;
    putObject: (key: string, obj: object) => void;
    getUser: (name: string) => IUser | undefined;
    hasUser: (key: string) => boolean;
    saveUsers: (users: IUser[]) => void;
    get<T> (instance: string): T;
}
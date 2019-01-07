
import { Cookies } from "react-cookie";
import { LocalStorageProvider } from "./localStorage";

import { IUser, ILocalStorageProvider } from "../common/interfaces";

interface ILoginProvider {
    getUser: () => {};
    isLogged: () => boolean;
    logout: () => void;
}

export class LoginProvider implements ILoginProvider {
    private cookies: Cookies;
    private localStorageProvider: ILocalStorageProvider;
    constructor() {
        this.localStorageProvider = new LocalStorageProvider();
        this.cookies = new Cookies();
      }
    getUser = (): {} => {
        return this.cookies.get("user");
    }

    isLogged = (): boolean => {
        return this.getUser() !== undefined;
    }

    logout = (): void => {
        this.cookies.remove("user");
    }

    login = (name: string): void => {
        const user: IUser = this.localStorageProvider.getObject(name) as IUser;
        if (user) {
            this.cookies.set("user", user, { path: "/" });
        }
    }
}
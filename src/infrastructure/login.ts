
import { Cookies } from "react-cookie";

interface ILoginProvider {
    cookies: Cookies;
    getUser: () => {};
    isLogged: () => boolean;
}

export class LoginProvider implements ILoginProvider {
    cookies: Cookies = new Cookies();

    getUser = (): {} => {
        return this.cookies.get("user");
    }

    isLogged = (): boolean => {
        return this.getUser() !== undefined;
    }
}
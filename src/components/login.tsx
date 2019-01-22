import React from "react";
import { LoginProvider } from "../infrastructure/login";

export const Login: () => JSX.Element = () => {
    const loginProvider: LoginProvider = new LoginProvider();
    console.log(loginProvider.getUser());
    if (loginProvider.isLogged()) {
        return (
            <div className="menu-right">{loginProvider.getUser().name} Выход</div>
        );
    }
    return (
        <div className="menu-right">Вход / Регистрация</div>
    );
};
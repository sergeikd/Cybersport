import React from "react";
import { Link } from "react-router-dom";
import { LoginProvider } from "../../infrastructure/loginProvider";

export const UserPanel = (): JSX.Element => {
    const loginProvider: LoginProvider = new LoginProvider();
    console.log(loginProvider.getUser());
    if (loginProvider.isLogged()) {
        return (
            <div className="menu-right">{loginProvider.getUser().name}
                ({loginProvider.getUser().roleId}) |&nbsp;
                    {/* &nbsp;| */}
                <Link to="/logout">Выход</Link>
            </div>
        );
    }
    return (
        <div className="menu-right">
            <Link to="/login">Вход</Link>
            {/* <Link to="/signin">Регистрация</Link> */}
        </div>
    );
};
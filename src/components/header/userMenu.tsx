import React from "react";
import { Link } from "react-router-dom";
import { LoginProvider } from "../../infrastructure/loginProvider";

export const UserMenu: () => JSX.Element | null = () => {
    const loginProvider: LoginProvider = new LoginProvider();
    if (loginProvider.isLogged()) {
        return (
            <div className="menu-left">
                <Link to="/menu1">Menu1</Link>
                <Link to="/menu2">Menu2</Link>
            </div>
        );
    }
    return (null);
};
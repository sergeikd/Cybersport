import React from "react";
import { Login } from "./login";

export const MainMenu: () => JSX.Element = () => {
    return (
        <div className="main-menu-container header menu" >
            <a className="logo" href="/"> </a>
            <Login />
        </div>
    );
};
import React from "react";
import { Link } from "react-router-dom";
import { UserPanel } from "./userPanel";
import { UserMenu } from "./userMenu";

export const Header: () => JSX.Element = () => {
    return (
        <div className="main-menu-container header menu" >
            <Link className="logo" to="/"/>
            <UserMenu />
            {/* <a className="logo" href="/"> </a> */}
            <UserPanel />
        </div>
    );
};
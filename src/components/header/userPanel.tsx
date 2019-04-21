import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserState } from "../../common/interfaces";

const UserPanel = ((props: { user: any }): JSX.Element => {
    if (props.user.name) {
        return (
            <div className="menu-right">{props.user.name}
                ({props.user.roleId})
                <p className="menu-separator">|</p>
                <Link to="/logout">Выход</Link>
            </div>
        );
    }
    return (
        <div className="menu-right">
            <Link to="/login">Вход</Link>
        </div>
    );
});

const mapStateToProps = (state: IUserState) => {
    return {
        user: state.users.loggedUser,
    };
};

export default connect(mapStateToProps)(UserPanel);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserState, IUser } from "../../common/interfaces";

const UserMenu = ((props: { user: IUser }): JSX.Element | null => {
    switch (props.user.roleId) {
        case 0:
            return (
                <div className="menu-left">
                    <Link to="/users">Пользователи</Link>
                </div>
            );
        case 1:
            return null;
        case 2:
            return null;
        default:
            return null;
    }
});

const mapStateToProps = (state: IUserState) => {
    return {
        user: state.users.loggedUser,
    };
};

export default connect(mapStateToProps)(UserMenu);
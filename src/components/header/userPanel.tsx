import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IState } from "../../common/interfaces";

const UserPanel = ((props: { user: any }): JSX.Element => {
    console.log("in user panel", props.user);
    if (props.user.name) {
        return (
            <div className="menu-right">{props.user.name}
                ({props.user.roleId}) |&nbsp;
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
});

const mapStateToProps = (state: IState) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserPanel);
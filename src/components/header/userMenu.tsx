import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IState, IUser } from "../../common/interfaces";

const UserMenu = ((props: { user: IUser}): JSX.Element | null => {
    if (props.user.name) {
        return (
            <div className="menu-left">
                <Link to="/menu1">Menu1</Link>
                <Link to="/menu2">Menu2</Link>
            </div>
        );
    }
    return (null);
});

const mapStateToProps = (state: IState) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserMenu);
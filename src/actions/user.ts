import { IUser } from "../common/interfaces";
import * as actionTypes from "../common/action-types";

export const logIn = (user: IUser) => {
    return {
        type: actionTypes.LOG_IN,
        user,
    };
};

export const logOut = () => {
    return {
        type: actionTypes.LOG_OUT,
    };
};

export const getUsers = () => {
    return {
        type: actionTypes.GET_USERS,
    };
};

export const updateUserStatus = (id: number) => {
    return {
        type: actionTypes.CHANGE_USER_ACTIVE,
        id,
    };
};
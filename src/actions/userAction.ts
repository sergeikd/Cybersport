import { Dispatch } from "redux";
import { IUser, IRole } from "../common/interfaces";
import * as actionTypes from "../common/action-types";
import * as instances from "../common/instances";
import { LocalStorageProvider } from "../infrastructure/localStorage";
import { ROLES } from '../common/instances';

const localStorageProvider = new LocalStorageProvider();

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

const fetchUsers = (userList: IUser[]) => {
    return {
        type: actionTypes.GET_USERS,
        userList
    };
};

const fetchRoles = (roles: IRole[]) => {
    return {
        type: actionTypes.GET_ROLES,
        roles
    };
};

export const updateUserStatus = (id: number) => {
    return {
        type: actionTypes.CHANGE_USER_ACTIVE,
        id,
    };
};



export const updateUserRole = (user: Partial<IUser>) => {
    return {
        type: actionTypes.CHANGE_USER_ROLE,
        user,
    };
};

export const getUsers = () => (dispatch: Dispatch) => {
    localStorageProvider.get<IUser[]>(instances.USERS)
        .then((userList) => {
            dispatch(fetchUsers(userList));
        });
};

export const getRoles = () => (dispatch: Dispatch) => {
    localStorageProvider.get<IRole[]>(instances.ROLES)
        .then((roles) => {
            dispatch(fetchRoles(roles));
        });
};
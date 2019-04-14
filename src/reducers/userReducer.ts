import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { LocalStorageProvider } from "../infrastructure/localStorage";
import { IUser, IRole } from "../common/interfaces";

const initialState = {
    loggedUser: {},
    userList: new Array<IUser>(),
    roles: new Array<IRole>(),
};
const localStorageProvider = new LocalStorageProvider();

export const users = (state = initialState, action: any) => {
    return produce(state, draft => {
        switch (action.type) {
            case actionTypes.LOG_IN:
                return { ...state, loggedUser: action.user };
            case actionTypes.LOG_OUT:
                return { ...initialState };
            case actionTypes.GET_USERS:
                return { ...state, userList: localStorageProvider.get<IUser[]>("users") };
            case actionTypes.GET_ROLES:
                return { ...state, roles: localStorageProvider.get<IRole[]>("roles") };
            case actionTypes.CHANGE_USER_ACTIVE:
                const usersForChangeStatus: IUser[] = state.userList.map(user => {
                    if (user.id === action.id) {
                        const updatedUser: IUser = { ...user, isActive: !user.isActive };
                        return { ...user, ...updatedUser };
                    } else {
                        return user;
                    }
                });
                return { ...state, userList: usersForChangeStatus };
            case actionTypes.CHANGE_USER_ROLE:
                const usersForChangeRole: IUser[] = state.userList.map(user => {
                    if (user.id === action.user.id) {
                        const updatedUser: IUser = { ...user, roleId: action.user.roleId };
                        return { ...user, ...updatedUser };
                    } else {
                        return user;
                    }
                });
                return { ...state, userList: usersForChangeRole };
            default:
                return state;
        }
    });
};
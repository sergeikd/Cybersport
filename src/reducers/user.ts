import * as actionTypes from "../common/action-types";
import { LocalStorageProvider } from "../infrastructure/localStorage";
import { IUser } from "../common/interfaces";

const initialState = {
    loggedUser: {},
    userList: new Array<IUser>(),
};
const localStorageProvider = new LocalStorageProvider();

export const users = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return { ...state, loggedUser: action.user };
        case actionTypes.LOG_OUT:
            return { ...initialState };
        case actionTypes.GET_USERS:
            return { ...state, userList: localStorageProvider.get<IUser[]>("users") };
        case actionTypes.CHANGE_USER_ACTIVE:
            const users: IUser[] = state.userList.map(user => {
                if (user.id === action.id) {
                    const updatedUser: IUser = { ...user, isActive: !user.isActive };
                    return { ...user, ...updatedUser };
                } else {
                    return user;
                }
            });
            return { ...state, userList: users };
        default:
            return state;
    }
};
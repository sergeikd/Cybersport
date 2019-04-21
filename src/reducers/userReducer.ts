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
                draft.loggedUser = action.user;
                return draft;
            case actionTypes.LOG_OUT:
                draft = {...initialState};
                return draft;
            case actionTypes.GET_USERS:
                draft.userList = localStorageProvider.get<IUser[]>("users");
                return draft;
            case actionTypes.GET_ROLES:
                draft.roles = localStorageProvider.get<IRole[]>("roles");
                return draft;
            case actionTypes.CHANGE_USER_ACTIVE:
                const index =  draft.userList.findIndex(user => user.id === action.id);
                draft.userList[index].isActive = !draft.userList[index].isActive;
                return draft;
            case actionTypes.CHANGE_USER_ROLE:
                draft.userList[draft.userList.findIndex(user => user.id === action.user.id)].roleId = action.user.roleId;
                return draft;
        }
    });
};
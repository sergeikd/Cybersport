import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { IUser, IRole } from "../common/interfaces";

const initialState = {
    loggedUser: {},
    userList: new Array<IUser>(),
    roles: new Array<IRole>(),
};

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
                draft.userList = action.userList;
                return draft;
            case actionTypes.GET_ROLES:
                draft.roles = action.roles;
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
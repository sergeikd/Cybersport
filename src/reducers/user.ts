import * as actionTypes from "../common/action-types";

const initialState = {
    id: undefined,
    name: undefined,
    roleId: undefined,
};

export const user = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            // storage.setItem("user", JSON.stringify(action.payload));
            return {  ...state, ...action.user };
        case actionTypes.LOG_OUT:
            return {  initialState };
        default:
            return state;
    }
};
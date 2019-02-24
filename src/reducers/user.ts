import * as actionTypes from "../common/action-types";

export const user = (state = {}, action: any) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            // storage.setItem("user", JSON.stringify(action.payload));
            return {  ...state, ...action.user };

        default:
            return state;
    }
};
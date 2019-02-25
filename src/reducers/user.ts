import * as actionTypes from "../common/action-types";

const initialState = {
    isActive: false,
};

export const user = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {  ...state, ...action.user };
        case actionTypes.LOG_OUT:
            return initialState;
        default:
            return state;
    }
};
import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { IGame } from "../common/interfaces";

const initialState = {
    loggedUser: {},
    gamesList: new Array<IGame>(),
};

export const games = (state = initialState, action: any) => {
    return produce(state, draft => {
        switch (action.type) {
            case actionTypes.GET_GAMES:
                draft.gamesList = action.gamesList;
                return draft;
        }
    });
};

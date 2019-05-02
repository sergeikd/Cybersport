import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { IGame, IAction } from "../common/interfaces";

const initialState = {
    gamesList: new Array<IGame>(),
};

export const games = (state = initialState, action: IAction) => {
    return produce(state, draft => {
        switch (action.type) {
            case actionTypes.GET_GAMES:
                draft.gamesList = action.gamesList;
                return draft;
        }
    });
};

import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { LocalStorageProvider } from "../infrastructure/localStorage";
import { IGame } from "../common/interfaces";

const initialState = {
    loggedUser: {},
    gamesList: new Array<IGame>(),
};
const localStorageProvider = new LocalStorageProvider();

export const games = (state = initialState, action: any) => {
    return produce(state, draft => {
        switch (action.type) {
            case actionTypes.GET_GAMES:
                draft.gamesList = localStorageProvider.get<IGame[]>("games");
                return draft;
        }
    });
};
import { Dispatch } from "redux";
import * as actionTypes from "../common/action-types";
import { IGame } from "../common/interfaces";
import { LocalStorageProvider } from "../infrastructure/localStorage";

const localStorageProvider = new LocalStorageProvider();

const fetchGames = (gamesList: IGame[]) => {
    return {
        type: actionTypes.GET_GAMES,
        gamesList
    };
};

export const getGames = () => (dispatch: Dispatch) => {
    localStorageProvider.getGames()
        .then((gamesList) => {
            dispatch(fetchGames(gamesList));
        });
};
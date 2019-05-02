import { Dispatch } from "redux";
import * as actionTypes from "../common/action-types";
import { IGame } from "../common/interfaces";
import { ApiProvider } from "../infrastructure/fakeApi";
import * as instances from "../common/instances";

const apiProvider = new ApiProvider();

const fetchGames = (gamesList: IGame[]) => {
    return {
        type: actionTypes.GET_GAMES,
        gamesList
    };
};

export const getGames = () => (dispatch: Dispatch) => {
    apiProvider.get<IGame[]>(instances.GAMES)
        .then((gamesList) => {
            dispatch(fetchGames(gamesList));
        });
};
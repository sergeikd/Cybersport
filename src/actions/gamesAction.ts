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

export const editGame = (updatedGame: IGame) => {
    apiProvider.get<IGame[]>(instances.GAMES)
        .then((gamesList) => {
            const index = gamesList.findIndex(game => game.id === updatedGame.id);
            gamesList[index] = updatedGame;
            apiProvider.save(instances.GAMES, gamesList);
        });
};

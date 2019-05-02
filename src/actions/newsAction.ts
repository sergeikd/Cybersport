import { Dispatch } from "redux";
import { INews } from "../common/interfaces";
import * as actionTypes from "../common/action-types";
import { LocalStorageProvider } from "../infrastructure/localStorage";

const localStorageProvider = new LocalStorageProvider();

const fetchNews = (gamesList: INews[]) => {
    return {
        type: actionTypes.GET_NEWS,
    };
};

export const getNews = () => (dispatch: Dispatch) => {getNews
    localStorageProvider.get<INews[]>("news")
        .then((gamesList) => {
            dispatch(fetchNews(gamesList));
        });
};
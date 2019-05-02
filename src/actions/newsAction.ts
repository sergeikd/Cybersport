import { Dispatch } from "redux";
import { INews } from "../common/interfaces";
import * as actionTypes from "../common/action-types";
import { ApiProvider } from "../infrastructure/fakeApi";

const apiProvider = new ApiProvider();

const fetchNews = (gamesList: INews[]) => {
    return {
        type: actionTypes.GET_NEWS,
        gamesList
    };
};

export const getNews = () => (dispatch: Dispatch) => {getNews
    apiProvider.get<INews[]>("news")
        .then((gamesList) => {
            dispatch(fetchNews(gamesList));
        });
};
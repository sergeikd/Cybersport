import { Dispatch } from "redux";
import { INews } from "../common/interfaces";
import * as actionTypes from "../common/action-types";
import { ApiProvider } from "../infrastructure/fakeApi";

const apiProvider = new ApiProvider();

const fetchNews = (newsList: INews[]) => {
    return {
        type: actionTypes.GET_NEWS,
        newsList
    };
};

export const getNews = () => (dispatch: Dispatch) => {getNews
    apiProvider.get<INews[]>("news")
        .then((newsList) => {
            dispatch(fetchNews(newsList));
        });
};
// import { IUser, IRole } from "../common/interfaces";
import * as actionTypes from "../common/action-types";

export const getNews = () => {
    return {
        type: actionTypes.GET_NEWS,
    };
};
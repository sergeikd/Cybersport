
import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { LocalStorageProvider } from "../infrastructure/localStorage";
import { IAction, INews, INewsState } from "../common/interfaces";

const localStorageProvider = new LocalStorageProvider();

export const initialState = {
  newsList: new Array<INews>()
};

export const news = (state = initialState, action: IAction) => {
    return produce(state, draft => {
      switch (action.type) {
          case actionTypes.GET_NEWS:
              draft.newsList = localStorageProvider.get<INews[]>("news");
              return draft;
          default:
              return draft;
      }
  });
};
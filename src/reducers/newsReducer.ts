
import { produce } from "immer";
import * as actionTypes from "../common/action-types";
import { IAction, INews } from "../common/interfaces";

export const initialState = {
  newsList: new Array<INews>()
};

export const news = (state = initialState, action: IAction) => {
    return produce(state, draft => {
      switch (action.type) {
          case actionTypes.GET_NEWS:
              draft.newsList = action.newsList;
              return draft;
      }
  });
};
import { ActionReducerMap } from '@ngrx/store';

import * as RxnSearchModuleActions from './rxn-search.actions';

export const reducers: ActionReducerMap<RxnSearchModuleState> = {
  rxnSearchState: rxnSearchReducer
};
export interface RxnSearchModuleState {
  rxnSearchState: RxnSearchState[];
}

export interface RxnSearchState {
  modalStatus: boolean;
  queryString: string;
}
const intialState: RxnSearchState = {
  modalStatus: false,
  queryString: null
};

export function rxnSearchReducer(state = [intialState], action) {
  switch (action.type) {
    case RxnSearchModuleActions.MODAL_STATUS:
      return [
        ...state,
        Object.assign(
          {},
          {
            modalStatus: action.payload,
            queryString: state.slice(-1)[0].queryString || null
          }
        )
      ];
    case RxnSearchModuleActions.QUERY_STRING:
      return [
        ...state,
        Object.assign(
          {},
          {
            modalStatus: false,
            queryString: action.payload
          }
        )
      ];
    default:
      return state;
  }
}

import { ActionReducerMap } from '@ngrx/store';

import * as RuidSearchModuleActions from './ruid-search.actions';

export const reducers: ActionReducerMap<RuidSearchModuleState> = {
  ruidSearchState: ruidSearchReducer
};
export interface RuidSearchModuleState {
  ruidSearchState: RuidSearchState[];
}

export interface RuidSearchState {
  ruid: string;
}
const intialState: RuidSearchState = {
  ruid: null
};

export function ruidSearchReducer(state = [intialState], action) {
  switch (action.type) {
    case RuidSearchModuleActions.RUID:
      return [
        ...state,
        Object.assign(
          {},
          {
            ruid: action.payload,
          }
        )
      ];
    default:
      return state;
  }
}


import { Action } from "@ngrx/store";

export const MODAL_STATUS = "MODAL_STATUS";
export const QUERY_STRING = "QUERY_STRING";


export class QueryString implements Action {
  readonly type = QUERY_STRING;
  constructor(public payload: string) {}
}

export class ModalStatus implements Action {
  readonly type = MODAL_STATUS;
  constructor(public payload: boolean) {}
}

export type RxnSearchModuleActions = QueryString  | ModalStatus ;

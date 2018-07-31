import { Action } from '@ngrx/store';

export const RUID = 'RUID';

export class Ruid implements Action {
  readonly type = RUID;
  constructor(public payload: string) {}
}

export type RuidSearchModuleActions = Ruid;

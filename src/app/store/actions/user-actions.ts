import { Action } from "@ngrx/store";

import { type } from "../utils";
import { User } from '../../model';

export const SET_CURRENT_USER:string  =  type('[User] Set Current');

export class SetCurrentUserAction implements Action {
  type = SET_CURRENT_USER;

  constructor(public payload: User) { }
}

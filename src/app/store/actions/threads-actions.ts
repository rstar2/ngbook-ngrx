import { Action } from "@ngrx/store";

import { type } from "../utils";
import { Message, Thread } from '../../model';

export const ADD_THREAD = type('[Thread] Add');
export const ADD_MESSAGE = type('[Thread] Add Message');
export const SELECT_THREAD = type('[Thread] Select');

export class AddThreadAction implements Action {
  type = ADD_THREAD;

  constructor(public payload: Thread) { }
}

export class AddMessageAction implements Action {
  type = ADD_MESSAGE;
  payload: {thread :Thread, message: Message};

  constructor(thread :Thread, message: Message) {
    this.payload = {thread, message};
  }
}

export class SelectThreadAction implements Action {
  type = SELECT_THREAD;

  constructor(public payload: Thread) { }
}

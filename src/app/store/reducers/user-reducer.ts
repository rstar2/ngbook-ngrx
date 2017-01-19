import { Action } from "@ngrx/store";
import { createSelector } from 'reselect';

import { User } from "../../model";
import { UserState, initialState } from "../state/user-state";
import { UserActions } from "../actions";
import { AppState } from "../state";


export const UserReducer =
  function (state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
      case UserActions.SET_CURRENT_USER:
        const user: User = (<UserActions.SetCurrentUserAction>action).payload;
        return {
          currentUser: user
        };
      default:
        return state;
    }
  };

const getUserState = (state: AppState): UserState => state.user;

export const getCurrentUser = createSelector(
  getUserState,
  (state: UserState) => state.currentUser);

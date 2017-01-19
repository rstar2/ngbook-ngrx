import { ActionReducer, combineReducers, Action } from "@ngrx/store";
import { compose } from "@ngrx/core";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "../../environments/environment";

import { AppState } from "./state";
import appReducers from "./reducers";

export default (state: AppState, action: Action): AppState => {
  let reducer: ActionReducer<AppState>;

  if (environment.production) {
    reducer = compose(storeFreeze, combineReducers)(appReducers);
  } else {
    reducer = combineReducers(appReducers);
  }

  return reducer(state, action);
}

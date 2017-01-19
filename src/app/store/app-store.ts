import { ActionReducer, combineReducers } from "@ngrx/store";
import { compose } from "@ngrx/core";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "../../environments/environment";

import { AppState } from "./state";
import appReducer from "./reducers";


let actionReducer: ActionReducer<AppState>;

if (environment.production) {
  actionReducer = compose(storeFreeze, combineReducers)(appReducer);
}
else {
  actionReducer = combineReducers(appReducer);
}

export function reducer(state: any, action: any) {
  return actionReducer(state, action);
}


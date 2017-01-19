import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';

import { StoreModule } from "@ngrx/store";

import { reducer as appStateReducer } from "./store/app-store";

import { ComponentsModule, AppComponent } from "./components";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,

    ComponentsModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(appStateReducer),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

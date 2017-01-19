import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { PipesModule } from "../pipes";

import { ChatThreadComponent } from "./thread.component";
import { ChatThreadsComponent } from "./threads.component";
import { ChatMessageComponent } from "./message.component";
import { ChatWindowComponent } from "./window.component";
import { ChatNavBarComponent } from "./nav-bar.component";
import { ChatPageComponent } from "./page.component";
import { AppComponent } from "./app.component";

const COMPONENTS = [
  AppComponent,
  ChatPageComponent,
  ChatNavBarComponent,
  ChatWindowComponent,
  ChatMessageComponent,
  ChatThreadsComponent,
  ChatThreadComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}

export { AppComponent };

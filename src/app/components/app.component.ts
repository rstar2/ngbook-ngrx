import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

import { AppState } from "../store/state";

import ChatExampleData from "../ChatExampleData";

@Component({
  selector: 'chat-root',
  template: `
  <div>
     <chat-page></chat-page>
  </div>
`,
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    ChatExampleData(store);
  }
}

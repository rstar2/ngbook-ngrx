import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import { AppState } from "../store/state";
import { getUnreadMessagesCount } from "../store/reducers";

/**
 * ChatNavBarComponent shows the header and unread count
 */
@Component({
  selector: 'chat-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="https://ng-book.com/2">
          <img src="${require('assets/images/logos/ng-book-2-minibook.png')}"/>
           ng-book 2
        </a>
      </div>
      <p class="navbar-text navbar-right">
        <button class="btn btn-primary" type="button">
          Messages <span class="badge">{{ unreadMessagesCount$ | async }}</span>
        </button>
      </p>
    </div>
  </nav>
  `
})
export class ChatNavBarComponent {
  unreadMessagesCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.unreadMessagesCount$ = store.select(getUnreadMessagesCount);
  }

}

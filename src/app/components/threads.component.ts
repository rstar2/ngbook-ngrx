import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Thread } from "../model";

import { AppState } from "../store/state";
import { getAllThreads, getCurrentThread } from "../store/reducers";
import { ThreadsActions } from "../store/actions";

/**
 * ChatThreadsComponent shows the list of current threads
 */
@Component({
  selector: 'chat-threads',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <!-- conversations -->
  <div class="row">
    <div class="conversation-wrap">
      <chat-thread
           *ngFor="let thread of (threads$ | async)"
           [thread]="thread"
           [selected]="thread.id === (currentThreadId$ | async)"
           (onThreadSelected)="handleThreadClicked($event)">
      </chat-thread>
    </div>
  </div>
  `
})

export class ChatThreadsComponent {
  threads$: Observable<Thread[]>;
  currentThreadId$: Observable<string>;

  constructor(private store: Store<AppState>) {
    // Store the threads list
    this.threads$ = store.select(getAllThreads);

    // We want to mark the current thread as selected,
    // so we store the currentThreadId as a value
    this.currentThreadId$ = store.select(getCurrentThread).map(thread => thread.id);
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(new ThreadsActions.SelectThreadAction(thread));
  }
}

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

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
           *ngFor="let thread of threads"
           [thread]="thread"
           [selected]="thread.id === currentThreadId"
           (onThreadSelected)="handleThreadClicked($event)">
      </chat-thread>
    </div>
  </div>
  `
})

export class ChatThreadsComponent {
  threads: Thread[];
  currentThreadId: string;

  constructor(private store: Store<AppState>) {
    store.subscribe((state) => this.updateState(state));
  }

  updateState(state: AppState) {
    // Store the threads list
    this.threads = getAllThreads(state);

    // We want to mark the current thread as selected,
    // so we store the currentThreadId as a value
    this.currentThreadId = getCurrentThread(state).id;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(new ThreadsActions.SelectThreadAction(thread));
  }
}

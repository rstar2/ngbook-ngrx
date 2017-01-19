import { ElementRef, Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Thread, User, Message } from "../model";

import { AppState } from "../store/state";
import { ThreadsActions } from "../store/actions";
import { getCurrentThread, getCurrentUser } from "../store/reducers";


/**
 * ChatWindowComponent is the container which handles the current chat
 */
@Component({
  selector: 'chat-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">

            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - {{currentThread.name}}
                </h3>
              </div>
              <div class="panel-buttons-container"  >
                <!-- you could put minimize or close buttons here -->
              </div>
            </div>

            <div class="panel-body msg-container-base">
              <chat-message
                   *ngFor="let message of currentThread.messages"
                   [message]="message">
              </chat-message>
            </div>

            <div class="panel-footer">
              <div class="input-group">
                <input type="text"
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ngModel)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                     (click)="onEnter($event)"
                     >Send</button>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatWindowComponent {
  currentThread: Thread;
  draftMessage: {text: string};
  currentUser: User;

  constructor(private store: Store<AppState>,
              private el: ElementRef) {
    store.subscribe((state) => this.updateState(state));
    this.draftMessage = {text: ''};
  }

  updateState(state: AppState) {
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage(): void {
    this.store.dispatch(new ThreadsActions.AddMessageAction(
      this.currentThread, Message.createNew(this.currentThread, {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text
      }))
    );
    this.draftMessage = {text: ''};
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

}

import { OnInit, Component, Input } from "@angular/core";

import { Message } from "../model";

/**
 * ChatMessageComponent is a component that shows a single Message in the ChatWindowComponent.
 * ChatMessageComponent shows the message a user sent and indicates whether it is incoming or outgoing
 */
@Component({
  selector: 'chat-message',
  template: `
  <div class="msg-container"
       [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">

    <div class="avatar"
         *ngIf="!incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>

    <div class="messages"
      [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
      <p>{{message.text}}</p>
      <p class="time">{{message.sender}} • {{message.sentAt | fromNow}}</p>
    </div>

    <div class="avatar"
         *ngIf="incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>
  </div>
  `
})
export class ChatMessageComponent implements OnInit {
  @Input()
  message: Message;
  incoming: boolean;

  ngOnInit(): void {
    this.incoming = !this.message.author.isClient;
  }
}

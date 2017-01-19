import { uuid } from "../util/uuid";

import { User } from "./user";
import { Thread } from "./thread";

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  static createNew(thread: Thread, messageArg: any): Message {
    const defaults = {
      id: uuid(),
      sentAt: new Date(),
      isRead: false,
      thread: thread
    };

    const message: Message = Object.assign({}, defaults, messageArg);

    return message;
  }
}

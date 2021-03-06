import { Store } from '@ngrx/store';
import { uuid } from './util/uuid';
import * as moment from 'moment';

import { Thread, User, Message } from './model';
import { AppState } from "./store/state";
import { ThreadsActions, UserActions } from "./store/actions";
import { getAllMessages } from "./store/reducers";

/**
 * ChatExampleData sets up the initial data for our chats as well as
 * configuring the "bots".
 */

// the person using the app is Juliet
const me: User = {
  id: uuid(),
  isClient: true, // <-- notice we're specifying the client as this User
  name: 'Juliet',
  avatarSrc: require('assets/images/avatars/female-avatar-1.png')
};

const ladycap: User = {
  id: uuid(),
  name: 'Lady Capulet',
  avatarSrc: require('assets/images/avatars/female-avatar-2.png')
};

const echo: User = {
  id: uuid(),
  name: 'Echo Bot',
  avatarSrc: require('assets/images/avatars/male-avatar-1.png')
};

const rev: User = {
  id: uuid(),
  name: 'Reverse Bot',
  avatarSrc: require('assets/images/avatars/female-avatar-4.png')
};

let wait: User = {
  id: uuid(),
  name: 'Waiting Bot',
  avatarSrc: require('assets/images/avatars/male-avatar-2.png')
};

let tLadycap: Thread = {
  id: 'tLadycap',
  name: ladycap.name,
  avatarSrc: ladycap.avatarSrc,
  messages: []
};

let tEcho: Thread = {
  id: 'tEcho',
  name: echo.name,
  avatarSrc: echo.avatarSrc,
  messages: []
};

let tRev: Thread = {
  id: 'tRev',
  name: rev.name,
  avatarSrc: rev.avatarSrc,
  messages: []
};

let tWait: Thread = {
  id: 'tWait',
  name: wait.name,
  avatarSrc: wait.avatarSrc,
  messages: []
};

export default function ChatExampleData(store: Store<AppState>) {

  // set the current User
  store.dispatch(new UserActions.SetCurrentUserAction(me));

  // create a new thread and add messages
  store.dispatch(new ThreadsActions.AddThreadAction(tLadycap));
  store.dispatch(new ThreadsActions.AddMessageAction(tLadycap, Message.createNew(tLadycap, {
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.'
  })));
  store.dispatch(new ThreadsActions.AddMessageAction(tLadycap, Message.createNew(tLadycap, {
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.'
  })));

  // create a few more threads
  store.dispatch(new ThreadsActions.AddThreadAction(tEcho));
  store.dispatch(new ThreadsActions.AddMessageAction(tEcho, Message.createNew(tEcho, {
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: 'I\'ll echo whatever you send me'
  })));

  store.dispatch(new ThreadsActions.AddThreadAction(tRev));
  store.dispatch(new ThreadsActions.AddMessageAction(tRev, Message.createNew(tRev, {
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: 'I\'ll reverse whatever you send me'
  })));

  store.dispatch(new ThreadsActions.AddThreadAction(tWait));
  store.dispatch(new ThreadsActions.AddMessageAction(tWait, Message.createNew(tWait, {
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding.` +
    ` Try sending '3'`
  })));

  // select the first thread
  store.dispatch(new ThreadsActions.SelectThreadAction(tLadycap));

  // Now we set up the "bots". We do this by watching for new messages and
  // depending on which thread the message was sent to, the bot will respond
  // in kind.

  let handledMessages = {};

  store.subscribe((state) => {
    getAllMessages(state)
    // bots only respond to messages sent by the user, so
    // only keep messages sent by the current user
      .filter(message => message.author.id === me.id)
      .map(message => {

        // This is a bit of a hack and we're stretching the limits of a faux
        // chat app. Every time there is a new message, we only want to keep the
        // new ones. This is a case where some sort of queue would be a better
        // model
        if (handledMessages.hasOwnProperty(message.id)) {
          return;
        }
        handledMessages[message.id] = true;

        switch (message.thread.id) {
          case tEcho.id:
            // echo back the same message to the user
            store.dispatch(new ThreadsActions.AddMessageAction(tEcho, Message.createNew(tEcho, {
              author: echo,
              text: message.text
            })));

            break;
          case tRev.id:
            // echo back the message reveresed to the user
            store.dispatch(new ThreadsActions.AddMessageAction(tRev, Message.createNew(tRev, {
              author: rev,
              text: message.text.split('').reverse().join('')
            })));

            break;
          case tWait.id:
            let waitTime: number = parseInt(message.text, 10);
            let reply: string;

            if (isNaN(waitTime)) {
              waitTime = 0;
              reply = `I didn\'t understand ${message}. Try sending me a number`;
            } else {
              reply = `I waited ${waitTime} seconds to send you this.`;
            }

            setTimeout(
              () => {
                store.dispatch(new ThreadsActions.AddMessageAction(tWait, Message.createNew(tWait, {
                  author: wait,
                  text: reply
                })));
              },
              waitTime * 1000);

            break;
          default:
            break;
        }
      });
  });


}

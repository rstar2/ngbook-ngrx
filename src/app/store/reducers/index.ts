import { UserReducer } from './user-reducer';
import { ThreadsReducer } from './threads-reducer';

export * from './user-reducer';
export * from './threads-reducer';

const appReducer = {
  user: UserReducer,
  threads: ThreadsReducer
};

export default appReducer;

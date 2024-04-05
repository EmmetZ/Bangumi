import { Dispatch, createContext } from 'react';
import { User } from '../types';

type UserState = User | undefined;


interface UserAction {
  type: 'set' | 'remove';
  value?: User;
}

interface TUserContext {
  user: UserState;
  dispatch: Dispatch<UserAction>;
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'set':
      return action.value;
    case 'remove':
      return undefined;
  }
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export default UserContext;

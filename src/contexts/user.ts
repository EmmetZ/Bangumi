import { Dispatch, createContext, useContext } from 'react';
import { OAuthInfo, User } from '../types';

type UserState = {
  user: User | undefined;
  auth?: OAuthInfo;
};

interface UserAction {
  type: 'set' | 'remove' | 'auth';
  user?: User;
  auth?: OAuthInfo;
}

interface TUserContext {
  state: UserState;
  dispatch: Dispatch<UserAction>;
}

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case 'set':
      return { ...state, user: action.user }
    case 'auth':
      return { user: action.user, auth: action.auth }
    case 'remove':
      return { user: undefined }
    default:
      return state;
  }
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const useUserContext = () => useContext(UserContext);

export default UserContext;
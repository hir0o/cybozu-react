import { UserType } from './types';

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState: UserType) => ({
  type: 'SIGN_IN',
  payload: {
    isSignedIn: true,
    uid: userState.uid,
    username: userState.username,
  },
});

import { UserType } from './types';

// 新規登録
export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState: UserType) => ({
  type: 'SIGN_IN',
  payload: {
    isSignedIn: true,
    uid: userState.uid,
    username: userState.username,
  },
});

// ログイン
export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (userState: UserType) => ({
  type: 'SIGN_UP',
  payload: {
    isSignedIn: true,
    uid: userState.uid,
    username: userState.username,
  },
});

// ログアウト

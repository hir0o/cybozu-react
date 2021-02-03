import { UserType } from './types';

// 新規登録
export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState: UserType) => ({
  type: 'SIGN_IN',
  payload: userState,
});

// ログイン
export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (userState: UserType) => {
  console.log(userState);
  return ({
    type: 'SIGN_UP',
    payload: userState,
  });
};

// ログアウト
export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => ({
  type: 'SIGN_OUT',
  payload: {
    isSignedIn: false,
    uid: '',
    username: '',
  },
});

export type UserType = {
  username: string,
  isSignedIn: boolean,
  uid: string,
};

export type SignUpType = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

export type ActionStringType = 'SIGN_IN' | 'SIGN_UP';

export type ActionType = {
  type: ActionStringType,
  payload: {}
};

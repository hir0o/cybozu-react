export type UserType = {
  username: string;
  email: string;
  isSignedIn: boolean;
  uid: string;
  profileImg?: string;
};

// google認証時のtype
export type GoogleAuthUserType = {
  email: string;
  displayName: string;
  uid: string;
  photoURL: string;
};

// 新規登録
export type SignUpType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// ログイン
export type SignIpType = {
  email: string;
  password: string;
};

export type ActionStringType = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT';

export type ActionType = {
  type: ActionStringType;
  payload: {};
};

import { push } from 'connected-react-router';
import { Dispatch } from 'react';
import { SignUpType, SignIpType, UserType, GoogleAuthUserType } from './types';
import { auth, db, FirebaseTimestamp, provider } from '../../firebase/index';
import { signInAction, signUpAction, signOutAction } from './actions';

// * 参考
// * https://firebase.google.com/docs/auth/web/password-auth?hl=ja

const usersRef = db.collection('users');

// 認証のリッスン
export const listenAuthState = () => (dispatch: Dispatch<any>) =>
  auth.onAuthStateChanged((user) => {
    if (user) {
      // ユーザーが認証されている場合
      const { uid } = user;

      void db
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data() as UserType;

          if (data) {
            dispatch(
              signInAction({
                isSignedIn: true,
                uid: data.uid,
                email: data.email,
                username: data.username,
                profileImg: data.profileImg,
              }),
            );
          }
        });
    } else {
      // ユーザーが認証されていない場合
      dispatch(push('/signin'));
    }
  });

// googleログイン
export const googleLogin = () => (dispatch: Dispatch<any>) =>
  auth.signInWithPopup(provider).then((result) => {
    const { user } = result;

    const { email, displayName, uid, photoURL } = user as GoogleAuthUserType;

    return db
      .collection('users')
      .doc(uid)
      .set({
        isSignedIn: true,
        uid,
        email,
        username: displayName,
        profileImg: photoURL,
      })
      .then(() => {
        dispatch(listenAuthState());
        dispatch(push('/companies'));
      });
  });

// 会員登録
export const signUp = ({
  username,
  email,
  password,
  confirmPassword,
}: SignUpType) => (dispatch: Dispatch<any>) => {
  // バリデーション
  if (
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === ''
  ) {
    alert('必須項目が未入力です。');

    return false;
  }

  if (password !== confirmPassword) {
    alert('パスワードが一致しません。');

    return false;
  }

  return auth.createUserWithEmailAndPassword(email, password).then((result) => {
    const { user } = result;

    if (user) {
      const { uid } = user;
      const timestamp = FirebaseTimestamp.now();

      const userInitialData = {
        created_at: timestamp,
        updated_at: timestamp,
        email,
        uid,
        username,
      };
      void db
        .collection('users')
        .doc(uid)
        .set(userInitialData)
        .then(() => {
          dispatch(listenAuthState());
          dispatch(push('/companies'));
        });
    }
  });
};

// ログイン
export const signIn = ({ email, password }: SignIpType) => (
  dispatch: Dispatch<any>,
) => {
  // バリデーション
  if (email === '' || password === '') {
    return false;
  }

  // TODO: アカウントがなかった場合の処理
  return auth.signInWithEmailAndPassword(email, password).then((result) => {
    const { user } = result;

    if (user) {
      const { uid } = user;

      void db
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data() as UserType;
          // ? この辺で型チェック？
          if (data) {
            dispatch(
              signUpAction({
                isSignedIn: true,
                uid: data.uid,
                email: data.email,
                username: data.username,
                profileImg: data.profileImg,
              }),
            );
            dispatch(push('/companies'));
          }
        });
    }
  });
};

export const signInWithGoogle = () => (dispatch: Dispatch<any>) =>
  auth.signInWithPopup(provider).then((result) => {
    const { user } = result;
    const { uid } = user as GoogleAuthUserType;
    void db
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        if (data) {
          dispatch(push('/companies'));
        } else {
          alert('アカウントが存在しません。');
        }
      });
  });

// ログアウト
export const signOut = () => (dispatch: Dispatch<any>) => {
  void auth.signOut().then(() => {
    dispatch(signOutAction());
    dispatch(push('/companies'));
  });
};

// ユーザー情報の編集
export const saveUser = ({
  user,
  username,
  profileImage,
}: {
  user: UserType;
  username: string;
  profileImage: string;
}) => (dispatch: Dispatch<any>) => {
  const timestamp = FirebaseTimestamp.now().toDate();

  const data = {
    ...user,
    username,
    profileImg: profileImage,
    updated_at: timestamp,
  };

  return usersRef
    .doc(user.uid)
    .set(data, { merge: true })
    .then(() => {
      dispatch(push('/companies'));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

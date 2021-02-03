import { push } from 'connected-react-router';
import {
  SignUpType, SignIpType, UserType, ImageType,
} from './types';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction, signUpAction, signOutAction } from './actions';

// * 参考
// * https://firebase.google.com/docs/auth/web/password-auth?hl=ja

const usersRef = db.collection('users');

// 認証のリッスン
export const listenAuthState = () => async (dispatch: any) => auth.onAuthStateChanged((user) => {
  if (user) { // ユーザーが認証されている場合
    const { uid } = user;

    db.collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        if (data) { // not undefind
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
  } else { // ユーザーが認証されていない場合
    dispatch(push('/signin'));
  }
});

// 会員登録
export const signUp = ({
  username, email, password, confirmPassword,
}: SignUpType) => async (dispatch: any) => {
  // バリデーション
  if (
    username === ''
      || email === ''
      || password === ''
      || confirmPassword === ''
  ) {
    alert('必須項目が未入力です。');
    return false;
  }

  if (password !== confirmPassword) {
    alert('パスワードが一致しません。');
    return false;
  }

  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
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
        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(listenAuthState());
            dispatch(push('/'));
          });
      }
    });
};

// ログイン
export const signIn = ({
  email, password,
}: SignIpType) => async (dispatch: any) => {
  // バリデーション
  if (email === '' || password === '') {
    return false;
  }
  return auth.signInWithEmailAndPassword(email, password).then((result) => {
    const { user } = result;

    if (user) {
      const { uid } = user;

      db.collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
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
            dispatch(push('/'));
          }
        });
    }
  });
};

// ログアウト
export const signOut = () => async (dispatch: any) => {
  auth.signOut().then(() => {
    dispatch(signOutAction());
    dispatch(push('/'));
  });
};

// ユーザー情報の編集
export const saveUser = ({ user, username, profileImage }: {
  user: UserType,
  username: string,
  profileImage: ImageType
}) => async (dispatch: any) => {
  const timestamp = FirebaseTimestamp.now().toDate();

  const data = {
    ...user,
    username,
    profileImg: profileImage,
    updated_at: timestamp,
  };

  return usersRef.doc(user.uid).set(data, { merge: true })
    .then(() => {
      dispatch(push('/'));
    }).catch((error) => {
      throw new Error(error);
    });
};

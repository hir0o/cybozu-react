import { push } from 'connected-react-router';
import { SignUpType } from './types';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { signInAction } from './actions';

// * 認証のリッスン
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
            }),
          );
        }
      });
  } else { // ユーザーが認証されていない場合
    dispatch(push('/signin'));
  }
});

// * 会員登録
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
            dispatch(push('/'));
          });
      }
    });
};

import { push } from 'connected-react-router';
import { SignUpType } from './types';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

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
          role: 'customer',
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

export default signUp;

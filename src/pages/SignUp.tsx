import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducks/users/operations';

const SignUp = () => {
  const dispatch = useDispatch();

  // stateの作成
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 関数のメモ化
  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername],
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail],
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword],
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword],
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <input
        placeholder="ユーザー名"
        required
        value={username}
        type="text"
        onChange={inputUsername}
      />
      <input
        placeholder="メールアドレス"
        required
        value={email}
        type="text"
        onChange={inputEmail}
      />
      <input
        placeholder="パスワード"
        required
        value={password}
        type="password"
        onChange={inputPassword}
      />
      <input
        placeholder="パスワード（確認）"
        required
        value={confirmPassword}
        type="password"
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <button
          onClick={() => dispatch(signUp({
            username, email, password, confirmPassword,
          }))}
          type="button"
        >
          登録する
        </button>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin, signUp } from '../reducks/users/operations';
import { TextInput } from '../components/UiKid/index';

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
    <div className="max-w-xl mx-auto mt-8 px-4 md:px-0">
      <h2 className="text-2xl">アカウント登録</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
        <TextInput
          placeholder=""
          label="ユーザー名"
          id="username"
          value={username}
          inputType="text"
          onChange={inputUsername}
        />
        <TextInput
          placeholder=""
          label="メールアドレス"
          id="email"
          value={email}
          inputType="text"
          onChange={inputEmail}
        />
        <TextInput
          placeholder=""
          label="パスワード"
          id="password"
          value={password}
          inputType="password"
          onChange={inputPassword}
        />
        <TextInput
          placeholder=""
          label="パスワード（確認）"
          id="confirmPassword"
          value={confirmPassword}
          inputType="password"
          onChange={inputConfirmPassword}
        />
        <button
          className="w-full bg-green-500 text-white text-bold raund-md py-2 px-3 rounded-md hover:bg-green-400"
          onClick={() => dispatch(signUp({
            username, email, password, confirmPassword,
          }))}
          type="button"
        >
          登録する
        </button>
        <p className="mt-6 text-center">もしくは</p>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-bold raund-md py-2 px-3 rounded-md text-gray-700"
          onClick={() => dispatch(googleLogin())}
        >
          Googleアカウントで登録

        </button>
      </div>
    </div>
  );
};

export default SignUp;

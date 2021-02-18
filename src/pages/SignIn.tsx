import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signInWithGoogle } from '../reducks/users/operations';
import { TextInput } from '../components/UiKid/index';

const SignIn = () => {
  const dispatch = useDispatch();

  // stateの作成
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 md:px-0">
      <h2 className="text-2xl">ログイン</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
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
        <button
          className="w-full bg-green-500 text-white text-bold raund-md py-2 px-3 rounded-md hover:bg-green-400"
          onClick={() =>
            dispatch(
              signIn({
                email,
                password,
              }),
            )
          }
          type="button"
        >
          ログイン
        </button>
        <p className="mt-6 text-center">もしくは</p>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-bold raund-md py-2 px-3 rounded-md text-gray-700"
          onClick={() => dispatch(signInWithGoogle())}
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
};

export default SignIn;

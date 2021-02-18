// * 認証をラップするコンポーネント

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selecors';

type Prop = {
  children: React.ReactNode;
};

const Auth: React.FC<Prop> = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  // コンポーネントがレンダリングされた後に実行
  useEffect(() => {
    if (!isSignedIn) {
      // ログインしているかどうか
      dispatch(listenAuthState());
    }
  }, []);

  return <>{isSignedIn ? children : <></>}</>;
};

export default Auth;

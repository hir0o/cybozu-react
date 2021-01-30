// * 認証をラップするコンポーネント

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selecors';

const Auth: React.FC = ({ children }) => {
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

  return (
    <>
      {isSignedIn ? (
        (children)
      ) : (
        <></>
      )}
    </>
  );
};

Auth.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Auth;

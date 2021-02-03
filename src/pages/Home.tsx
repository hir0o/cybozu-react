import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getUser } from '../reducks/users/selecors';
import { listenAuthState, signOut } from '../reducks/users/operations';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);

  useEffect(() => {
    if (!user.isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 md:px-0">
      <h1>トップページです。</h1>
      <button type="button" onClick={() => dispatch(push('/companies'))}>企業一覧</button>
      {user.isSignedIn ? (
        <>
          <h1>
            ユーザー名:
            {' '}
            {user.username}
          </h1>
          <button type="button" onClick={() => dispatch(signOut())}>ログアウト</button>
        </>
      ) : (
        <div>
          <button type="button" onClick={() => dispatch(push('/signup'))}>会員登録</button>
          <button type="button" onClick={() => dispatch(push('/signin'))}>ログイン</button>
        </div>
      )}
    </div>
  );
};

export default Home;

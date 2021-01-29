import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getUser } from '../reducks/users/selecors';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);

  return (
    <>
      <h1>トップページです。</h1>
      <button type="button" onClick={() => dispatch(push('/companies'))}>企業一覧</button>
      {user.isSignedIn ? (
        <h1>{user.username}</h1>
      ) : (
        <div>
          <button type="button" onClick={() => dispatch(push('/signup'))}>会員登録</button>
        </div>
      )}
    </>
  );
};

export default Home;

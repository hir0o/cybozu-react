import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h1>トップページです。</h1>
      <button type="button" onClick={() => dispatch(push('/companies'))}>企業一覧</button>
    </>
  );
};

export default Home;

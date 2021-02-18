import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../reducks/users/operations';
import { getIsSignedIn } from '../reducks/users/selecors';
import { initialStateType } from '../reducks/store/initialState';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: initialStateType) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <header className="shadow-md py-5 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex justify-around">
        <button
          type="button"
          className="text-xl font-bold"
          onClick={() => dispatch(push('/companies'))}
        >
          超就活用会社情報プラットフォーム(仮)
        </button>
        <ul className="flex justify-around">
          {isSignedIn ? (
            <>
              <li>
                <button
                  type="button"
                  onClick={() => dispatch(push('/companies'))}
                >
                  企業一覧
                </button>
              </li>
              <li className="ml-3">
                <button
                  type="button"
                  onClick={() => dispatch(push('/users/edit'))}
                >
                  プロフィール編集
                </button>
              </li>
              <li className="ml-3">
                <button type="button" onClick={() => dispatch(signOut())}>
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button type="button" onClick={() => dispatch(push('/signup'))}>
                  会員登録
                </button>
              </li>
              <li className="ml-3">
                <button type="button" onClick={() => dispatch(push('/signin'))}>
                  ログイン
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;

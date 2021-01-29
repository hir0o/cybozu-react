import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className="shadow-md py-5">
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <button type="button" className="text-xl font-bold" onClick={() => dispatch(push('/'))}>
          超就活用会社情報プラットフォーム(仮)
        </button>
      </div>
    </header>
  );
};

export default Header;

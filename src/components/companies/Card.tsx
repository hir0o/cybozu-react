import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import HTMLReactParser from 'html-react-parser';
import { CompanyType } from '../../reducks/companies/types';

type Props = {
  company: CompanyType
};

const Card: React.FC<Props> = ({ company }: Props) => {
  const dispatch = useDispatch();
  const returnCodeToBr = (text: string) => {
    if (text === '') {
      return text;
    }
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
  };

  return (
    <button type="button" onClick={() => dispatch(push(`/companies/${company.id}`))} className="bg-white rounded-md hover:bg-gray-50 shadow-md">
      <div className="flex p-4 cursor-pointer">
        <p>画像</p>
        <div>
          <h3>{company.name}</h3>
          <p>
            {returnCodeToBr(company.description)}
          </p>
        </div>
      </div>
    </button>
  );
};

export default Card;

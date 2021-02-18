import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { CompanyType } from '../../reducks/companies/types';
import { ProfileImage } from '../UiKid/index';
import NoImage from '../../assets/img/noimage.png';

const MAX_LENGTH = 55;

type Props = {
  company: CompanyType;
};

const Card: React.FC<Props> = ({ company }: Props) => {
  const dispatch = useDispatch();

  // 文章を省略する
  const omitText = (text: string): string => {
    if (text.length < MAX_LENGTH || text === undefined) {
      return text;
    }

    return `${text.substr(0, MAX_LENGTH)}...`;
  };

  return (
    <button
      type="button"
      onClick={() => dispatch(push(`/companies/${company.id}`))}
      className="bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow text-left border-t-4 border-blue-400 border-solid"
    >
      <div className="flex p-4 items-center cursor-pointer">
        <div className="w-24 flex-shrink-0">
          {company.profileImage ? (
            <ProfileImage path={company.profileImage} size="md" />
          ) : (
            <ProfileImage path={NoImage} size="md" />
          )}
        </div>
        <div className="flex-shrink ml-3">
          <h3>{company.name}</h3>
          <p className="leading-6 text-sm text-gray-600 mt-3">
            {omitText(company.description)}
          </p>
        </div>
      </div>
    </button>
  );
};

export default Card;

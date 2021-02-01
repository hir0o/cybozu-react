import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import { CompanyType } from '../reducks/companies/types';
import { db } from '../firebase/index';

const CompanyDetail: React.FC = () => {
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split('/companies/')[1];
  const [company, setCompany] = useState<CompanyType>({});

  useEffect(() => {
    db.collection('companies').doc(id).get()
      .then((doc: any) => {
        const data: CompanyType = doc.data();
        setCompany(data);
      });
  }, []);

  const returnCodeToBr = (text: string | undefined) => {
    if (text === '' || text === undefined) {
      return text;
    }
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
  };

  return (
    <div className="mx-4 mb-8">
      <div className="max-w-4xl mx-auto mt-8 px-4 shadow-sm bg-white p-4 rounded-md border-t-4 border-blue-400 border-solid">
        <div className="flex items-center">
          <div className="w-24">
            {company.profileImage ? (
              <img src={company.profileImage.path} alt="" className="w-full" />
            ) : ''}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl">{company.name}</h1>
            <p className="bg-gray-500 text-white w-12 text-center rounded-md mt-2 text-sm">{company.industry}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-8 px-4 shadow-sm bg-white p-4 rounded-md border-t-4 border-blue-400 border-solid">
        <h2 className="text-xl border-b-2 border-blue-300 border-solid pb-4">企業概要</h2>
        <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-4">
          <div>
            <h3 className="text-sm text-gray-400">住所</h3>
            <p className="text-sm mt-3">{company.location}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400">ホームページ</h3>
            <p className="text-sm mt-3">{company.hp}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400">
              設立年月
            </h3>
            {/* TODO: */}
            <p className="text-sm mt-3">2012年4月12日</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400">
              従業員数
            </h3>
            {/* TODO: */}
            <p className="text-sm mt-3">300人</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-8 px-4 shadow-sm bg-white p-4 rounded-md border-t-4 border-blue-400 border-solid">
        <h2 className="text-xl border-b-2 border-blue-300 border-solid pb-4">
          企業紹介
        </h2>
        <p className="leading-6 text-sm text-gray-600 mt-3">
          {returnCodeToBr(company.description)}
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-8 px-4 shadow-sm bg-white p-4 rounded-md border-t-4 border-blue-400 border-solid">
        <h2 className="text-xl border-b-2 border-blue-300 border-solid pb-4">
          コメント
        </h2>
        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className="flex items-center border-gray-200 border-b border-solid pb-2">
            <img className="w-12 h-12 flex-shrink-1" src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_yellow.png" alt="プロフィール画像" />
            <div className="ml-3">
              <p className="text-sm">hiroyuki</p>
              <p className="flex-shrink leading-5 text-sm text-gray-600">
                コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．
                コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．
                コメントが入ります．コメントが入ります．コメントが入ります．
              </p>
            </div>
          </div>
          <div className="flex items-center border-gray-200 border-b border-solid pb-2">
            <img className="w-12 h-12 flex-shrink-1" src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_yellow.png" alt="プロフィール画像" />
            <div className="ml-3">
              <p className="text-sm">hiroyuki</p>
              <p className="flex-shrink leading-5 text-sm text-gray-600">
                コメントが入ります．コメントが入ります．
              </p>
            </div>
          </div>
          <div className="flex items-center border-gray-200 border-b border-solid pb-2">
            <img className="w-12 h-12 flex-shrink-1" src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_yellow.png" alt="プロフィール画像" />
            <div className="ml-3">
              <p className="text-sm">hiroyuki</p>
              <p className="flex-shrink leading-5 text-sm text-gray-600">
                コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．
                コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが
                入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入り
                ます．コメントが入ります．コメントが入ります．コメントが入ります
                ．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．コメントが入ります．
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;

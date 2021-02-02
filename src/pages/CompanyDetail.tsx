import React, { useCallback, useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyType } from '../reducks/companies/types';
import { db } from '../firebase/index';
import { TextInput } from '../components/UiKid/index';
import { SectionBox, CommentItem } from '../components/companies/index';
import { addComment } from '../reducks/companies/operations';
import { getUserName } from '../reducks/users/selecors';

type Prop = {} & RouteComponentProps<{id: string}>;

const CompanyDetail: React.FC<Prop> = ({ match }) => {
  const { id } = match.params;
  const [company, setCompany] = useState<CompanyType>({} as CompanyType);
  const [comment, setComment] = useState<string>('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUserName(selector);

  const inputComment = useCallback(
    (event) => {
      setComment(event.target.value);
    },
    [setComment],
  );

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
      <SectionBox>
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
      </SectionBox>
      <SectionBox title="企業概要">
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
      </SectionBox>
      <SectionBox title="企業紹介">
        <p className="leading-6 text-sm text-gray-600 mt-3">
          {returnCodeToBr(company.description)}
        </p>
      </SectionBox>
      <SectionBox title="コメント">
        <div className="grid grid-cols-1 gap-4 mt-4">
          <CommentItem userName="hiroyuki" profileImgPath="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png" commentText="コメントです." />
          <CommentItem userName="hiroyuki" profileImgPath="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png" commentText="コメントです." />
          <CommentItem userName="hiroyuki" profileImgPath="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png" commentText="コメントです." />
          <CommentItem userName="hiroyuki" profileImgPath="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png" commentText="コメントです." />
          <CommentItem userName="hiroyuki" profileImgPath="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png" commentText="コメントです." />
        </div>
      </SectionBox>
      <SectionBox title="コメントを残す">
        <form>
          <TextInput
            inputType="textarea"
            placeholder="コメントを入力してください"
            className="text-sm"
            value={comment}
            id="comment"
            onChange={inputComment}
          />
          <div className="text-center mt-3">
            <button
              className="px-8 bg-blue-400 text-white text-bold raund-md py-2 rounded-md hover:bg-blue-300"
              onClick={() => dispatch(addComment(comment, id, company, username))}
              type="button"
            >
              投稿する
            </button>
          </div>
        </form>
      </SectionBox>
    </div>
  );
};

export default CompanyDetail;

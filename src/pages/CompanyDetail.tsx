import React, { useCallback, useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyType } from '../reducks/companies/types';
import { db } from '../firebase/index';
import { TextInput, ProfileImage } from '../components/UiKid/index';
import { SectionBox, CommentItem } from '../components/companies/index';
import { addComment } from '../reducks/companies/operations';
import { getUser } from '../reducks/users/selecors';
import NoImage from '../assets/img/noimage.png';
import { initialStateType } from '../reducks/store/initialState';

type Prop = RouteComponentProps<{ id: string }>;

const CompanyDetail: React.FC<Prop> = ({ match }) => {
  const { id } = match.params;
  const [company, setCompany] = useState<CompanyType>({} as CompanyType);
  const [comment, setComment] = useState<string>('');
  const dispatch = useDispatch();
  const selector = useSelector((state: initialStateType) => state);
  const user = getUser(selector);

  const { username, profileImg } = user;

  const inputComment = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComment(event.target.value);
    },
    [setComment],
  );

  const updateComment = (
    _comment: string,
    _username: string,
    _profileImagePath?: string,
  ) => {
    if (_comment === '') {
      return;
    }
    let comments = [];
    if (company.comments !== undefined) {
      comments = [
        ...company.comments,
        {
          username: _username,
          profileImagePath: _profileImagePath || NoImage,
          comment: _comment,
        },
      ];
    } else {
      comments = [
        {
          username: _username,
          profileImagePath: _profileImagePath || NoImage,
          comment: _comment,
        },
      ];
    }

    company.comments = comments;
    setCompany(company);
  };

  useEffect(() => {
    void db
      .collection('companies')
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data() as CompanyType;
        setCompany(data);
      });
  }, [id]);

  const deleteInput = useCallback(() => {
    setComment('');
  }, [setComment]);

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
          <div className="w-24 h-24">
            {company.profileImage ? (
              <ProfileImage path={company.profileImage} size="md" />
            ) : (
              <ProfileImage path={NoImage} size="md" />
            )}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl">{company.name}</h1>
            <p className="bg-gray-500 text-white w-12 text-center rounded-md mt-2 text-sm">
              {company.industry}
            </p>
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
            <h3 className="text-sm text-gray-400">設立年月</h3>
            {/* TODO: */}
            <p className="text-sm mt-3">2012年4月12日</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400">従業員数</h3>
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
          {company.comments &&
            company.comments.map((commentItem, index) => (
              <CommentItem
                userName={commentItem.username}
                profileImgPath={commentItem.profileImagePath}
                commentText={commentItem.comment}
                key={index}
              />
            ))}
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
              onClick={() => {
                dispatch(
                  addComment(comment, id, company, username, profileImg),
                );
                updateComment(comment, username, profileImg);
                deleteInput();
              }}
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

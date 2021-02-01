import React from 'react';

type Prop = {
  profileImgPath: string,
  userName: string,
  commentText: string
};

const CommentItem: React.FC<Prop> = ({ profileImgPath, userName, commentText }) => (
  <div className="flex items-center border-gray-200 border-b border-solid pb-4">
    <img className="w-12 h-12 flex-shrink-1" src={profileImgPath} alt="プロフィール画像" />
    <div className="ml-3">
      <p className="text-sm">{userName}</p>
      <p className="flex-shrink leading-5 text-sm text-gray-600">
        {commentText}
      </p>
    </div>
  </div>
);

export default CommentItem;

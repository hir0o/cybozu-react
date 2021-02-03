import React from 'react';
import NoImage from '../../assets/img/noimage.png';
import { ProfileImage } from '../UiKid';

type Prop = {
  profileImgPath: string,
  userName: string,
  commentText: string
};

const CommentItem: React.FC<Prop> = ({ profileImgPath, userName, commentText }) => (
  <div className="flex items-center border-gray-200 border-b border-solid pb-4">
    {profileImgPath ? (
      <ProfileImage path={profileImgPath} size="sm" />
    ) : (
      <ProfileImage path={NoImage} size="sm" />
    )}
    <div className="ml-3">
      <p className="text-sm">{userName}</p>
      <p className="flex-shrink leading-5 text-sm text-gray-600">
        {commentText}
      </p>
    </div>
  </div>
);

export default CommentItem;

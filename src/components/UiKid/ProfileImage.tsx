import React from 'react';

type Prop = {
  size: 'sm' | 'md' | 'lg'
  path: string
};
const sizez = {
  sm: 12,
  md: 24,
  lg: 36,
};
const ProfileImage: React.FC<Prop> = ({ size, path }) => (
  <img className={`object-cover w-${sizez[size]} h-${sizez[size]}`} src={path} alt="プロフィール画像" />
);

export default ProfileImage;

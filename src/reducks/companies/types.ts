export type ActionStringType = 'FETCH_COMPANIES';

export type ActionType = {
  type: ActionStringType,
  payload: any
};

type CommentType = {
  username: string,
  profileImagePath: string,
  comment: string,
  created_at?: Date,
};

export type ImageType = {
  id?: string,
  path?: string
};

export type CompanyType = {
  name: string,
  description: string,
  hp: string,
  industry: string,
  location: string,
  startDate: string,
  staffNumber: number,
  profileImage?: ImageType,
  comments?: CommentType[],
  id?: string,
  created_at?: Date,
  updated_at?: Date,
};

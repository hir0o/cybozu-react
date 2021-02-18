export type ActionStringType = 'FETCH_COMPANIES';

export type ActionType = {
  type: ActionStringType;
  payload: CompanyType[];
};

type CommentType = {
  username: string;
  profileImagePath: string;
  comment: string;
  createdAt?: Date;
};

export type CompanyType = {
  name: string;
  description: string;
  hp: string;
  industry: string;
  location: string;
  startDate: string;
  staffNumber: number;
  profileImage?: string;
  comments?: CommentType[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ActionStringType = 'FETCH_COMPANIES';

export type ActionType = {
  type: ActionStringType,
  payload: any
};

export type CompanyType = {
  name: string,
  description: string,
  profileImage: {id: string, path: string},
  hp: string,
  industry: string,
  location: string,
  startDate: string,
  staffNumber: number,
  id?: string,
  created_at?: Date,
  updated_at?: Date,
};

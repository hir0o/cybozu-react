export type ActionStringType = 'FETCH_COMPANIES';

export type ActionType = {
  type: ActionStringType,
  payload: any
};

export type CompanyType = {
  description?: string,
  bgImage?: {id: string, path: string},
  profileImage?: {id: string, path: string},
  hp?: string,
  industry?: string,
  location?: string,
  name?: string,
  id?: string
};

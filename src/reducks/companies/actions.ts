import { CompanyType } from './types';

// 企業情報の取得
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const fetchCompaniesAction = (companyList: CompanyType[]) => ({
  type: 'FETCH_COMPANIES',
  payload: companyList,
});

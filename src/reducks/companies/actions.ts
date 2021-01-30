// 企業情報の取得
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const fetchCompaniesAction = (companyList: any[]) => ({
  type: 'FETCH_COMPANIES',
  payload: companyList,
});

import { db } from '../../firebase/index';
import { fetchCompaniesAction } from './actions';
import { CompanyType } from './types';

const companiesRef = db.collection('companies');

const fetchCompanies = () => async (dispatch: any) => {
  // TODO: 降順で取得する
  companiesRef.get()
    .then((snapshots) => {
      const companyList: CompanyType[] = [];
      // TODO: mapとかを使った方がいい
      snapshots.forEach((snapshot) => {
        const company: CompanyType = snapshot.data() as CompanyType; // TODO: 無理やり
        companyList.push(company);
      });

      dispatch(fetchCompaniesAction(companyList));
    });
};

export default fetchCompanies;

import { db } from '../../firebase/index';
import { fetchCompaniesAction } from './actions';

const companiesRef = db.collection('companies');

const fetchCompanies = () => async (dispatch: any) => {
  // TODO: 降順で取得する
  companiesRef.get()
    .then((snapshots) => {
      const companyList = []; // TODO: anyになっちゃってる
      // TODO: mapとかを使った方がいい
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        companyList.push(product);
      });
      console.log(companyList);

      dispatch(fetchCompaniesAction(companyList));
    });
};

export default fetchCompanies;

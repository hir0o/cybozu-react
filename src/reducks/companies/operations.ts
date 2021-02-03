import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/index';
import { fetchCompaniesAction } from './actions';
import { CompanyType } from './types';

const companiesRef = db.collection('companies');

export const fetchCompanies = () => async (dispatch: any) => {
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

export const saveCompany = (company: CompanyType, id: string) => async (dispatch: any) => {
  const timestamp = FirebaseTimestamp.now().toDate();
  const data = {
    ...company,
    updated_at: timestamp,
  };

  // editじゃなかったら，
  if (id === '' || id === undefined) {
    // firebaseで自動付与されるidを取得
    const ref = companiesRef.doc();
    data.id = ref.id;
    data.created_at = timestamp;
  }

  return companiesRef.doc(id).set(data, { merge: true })
    .then(() => {
      dispatch(push('/'));
    }).catch((error) => {
      throw new Error(error);
    });
};

export const addComment = (
  comment: string,
  id: string,
  company: CompanyType,
  username: string,
) => async (dispatch: any) => {
  // コメントが空だったら何もしない
  if (comment === '') {
    alert('コメントを入力してください。');
    return false;
  }

  const timestamp = FirebaseTimestamp.now().toDate();

  // TODO: この辺りうまく書きたい。。。
  let data = {};

  if (company.comments !== undefined) {
    data = {
      ...company,
      comments: [
        ...company.comments,
        {
          username,
          profileImagePath: 'https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png',
          comment,
          created_at: timestamp,
        },
      ],
    };
  } else {
    data = {
      ...company,
      comments: [{
        username,
        profileImagePath: 'https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_green.png',
        comment,
        created_at: timestamp,
      },
      ],
    };
  }

  return companiesRef.doc(id).set(data, { merge: true })
    .then(() => {
      dispatch(push(`/companies/${id}`));
    }).catch((error) => {
      throw new Error(error);
    });
};

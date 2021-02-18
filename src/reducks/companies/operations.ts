import { push } from 'connected-react-router';
import { Dispatch } from 'react';
import { db, FirebaseTimestamp } from '../../firebase/index';
import { fetchCompaniesAction } from './actions';
import { CompanyType } from './types';
import NoImage from '../../assets/img/noimage.png';

const companiesRef = db.collection('companies');

export const fetchCompanies = () => (dispatch: Dispatch<any>) => {
  // TODO: 降順で取得する
  void companiesRef.get().then((snapshots) => {
    const companyList: CompanyType[] = [];
    // TODO: mapとかを使った方がいい
    snapshots.forEach((snapshot) => {
      const company: CompanyType = snapshot.data() as CompanyType;
      companyList.push(company);
    });

    dispatch(fetchCompaniesAction(companyList));
  });
};

export const saveCompany = (company: CompanyType) => (
  dispatch: Dispatch<any>,
) => {
  const timestamp = FirebaseTimestamp.now().toDate();
  const data = {
    ...company,
    updatedAt: timestamp,
  };

  const { id } = company;

  // editじゃなかったら，
  if (id === '' || id === undefined) {
    // firebaseで自動付与されるidを取得
    const ref = companiesRef.doc();
    data.id = ref.id;
    data.createdAt = timestamp;
  }

  return companiesRef
    .doc(data.id)
    .set(data, { merge: true })
    .then(() => {
      dispatch(push('/companies'));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const addComment = (
  comment: string,
  id: string,
  company: CompanyType,
  username: string,
  profileImagePath?: string,
) => async (dispatch: Dispatch<any>) => {
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
          profileImagePath: profileImagePath || NoImage,
          comment,
          created_at: timestamp,
        },
      ],
    };
  } else {
    data = {
      ...company,
      comments: [
        {
          username,
          profileImagePath: profileImagePath || NoImage,
          comment,
          created_at: timestamp,
        },
      ],
    };
  }

  return companiesRef
    .doc(id)
    .set(data, { merge: true })
    .then(() => {
      dispatch(push(`/companies/${id}`));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

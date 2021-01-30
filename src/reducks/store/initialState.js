// * initialState
// * storeの初期状態
// * アプリに必要な情報を全てここに記述していく

const initialState = {
  companies: {
    list: [],
  },
  users: {
    isSignedIn: false,
    uid: '',
    email: '',
    username: '',
  },
};

export default initialState;

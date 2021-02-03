import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImgInput, TextInput } from '../components/UiKid';
import { db } from '../firebase';
import { getUser } from '../reducks/users/selecors';
import { ImageType, UserType } from '../reducks/users/types';
import { saveUser } from '../reducks/users/operations';

const UserEdit: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);
  console.log(user);

  const [username, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<ImageType>({ path: '', id: '' });

  const inputUserName = useCallback(
    (event) => {
      setUserName(event.target.value);
    },
    [setUserName],
  );

  const id = user.uid;

  useEffect(() => {
    if (id !== '' && id !== undefined) {
      db.collection('users').doc(id).get().then((snapshot: any) => {
        const data = snapshot.data() as UserType;
        setUserName(data.username);
        if (data.profileImg !== undefined) {
          setProfileImage(data.profileImg);
        }
      });
    }
  }, [id]);

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 md:px-0">
      <h2 className="text-2xl">企業情報登録</h2>
      <form className="grid grid-cols-1 gap-6 mt-8">
        <ImgInput image={profileImage} setImage={setProfileImage} />
        <TextInput
          placeholder=""
          label="ユーザー名"
          id="username"
          value={username}
          inputType="text"
          onChange={inputUserName}
        />
        <button
          className="w-full bg-green-500 text-white text-bold raund-md py-2 px-3 rounded-md hover:bg-green-400"
          onClick={() => dispatch(saveUser({
            user,
            username,
            profileImage,
          }))}
          type="button"
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default UserEdit;

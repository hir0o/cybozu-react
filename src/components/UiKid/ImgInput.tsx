import React, { useCallback } from 'react';
import NoImage from '../../assets/img/noimage.png';
import { storage } from '../../firebase/index';
import ProfileImage from './ProfileImage';

type Prop = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ImgInput: React.FC<Prop> = ({ image, setImage }) => {
  // 画像のアップロード
  const uploadImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files) return;

      // Generate random 16 digits strings
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(files[0]);

      uploadTask
        .then(() => {
          // Handle successful uploads on complete
          void uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL: string) => {
              const newImage = downloadURL;
              setImage(newImage);
            });
        })
        .catch(() => console.log('err')); // eslint-disable-line no-console
    },
    [setImage],
  );

  return (
    <div>
      <label htmlFor="image" className="text-gray-700">
        画像を選択
      </label>
      <div className="w-36 mt-3">
        {image ? (
          <ProfileImage path={image} size="md" />
        ) : (
          <ProfileImage path={NoImage} size="md" />
        )}
      </div>
      <div>
        <input
          className="mt-3"
          type="file"
          id="image"
          onChange={(e) => uploadImage(e)}
        />
      </div>
    </div>
  );
};

export default ImgInput;

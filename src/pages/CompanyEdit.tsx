import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UiKid/index';

const CompanyEdit: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hp, setHp] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  // const [profileImage, setProfileImage] = useState({});
  const [staffNumber, setStaffNumber] = useState(0);
  const [startDate, setStartDate] = useState('');

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName],
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription],
  );
  const inputHp = useCallback(
    (event) => {
      setHp(event.target.value);
    },
    [setHp],
  );
  const inputIndustry = useCallback(
    (event) => {
      setIndustry(event.target.value);
    },
    [setIndustry],
  );
  const inputLocation = useCallback(
    (event) => {
      setLocation(event.target.value);
    },
    [setLocation],
  );
  // const inputProfileImage = useCallback(
  //   (event) => {
  //     setProfileImage(event.target.value);
  //   },
  //   [setProfileImage],
  // );
  const inputStaffNumber = useCallback(
    (event) => {
      setStaffNumber(event.target.value);
    },
    [setStaffNumber],
  );
  const inputStartDate = useCallback(
    (event) => {
      setStartDate(event.target.value);
    },
    [setStartDate],
  );

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 md:px-0">
      <h2 className="text-2xl">企業情報登録</h2>
      <form className="grid grid-cols-1 gap-6 mt-8">
        <TextInput
          placeholder=""
          label="会社名"
          id="name"
          value={name}
          inputType="text"
          onChange={inputName}
        />
        <TextInput
          placeholder=""
          label="詳細"
          id="description"
          value={description}
          inputType="textarea"
          onChange={inputDescription}
        />
        <TextInput
          placeholder="https://example.com"
          label="ホームページ"
          id="hp"
          value={hp}
          inputType="text"
          onChange={inputHp}
        />
        <TextInput
          placeholder=""
          label="業界"
          id="industry"
          value={industry}
          inputType="text"
          onChange={inputIndustry}
        />
        <TextInput
          placeholder=""
          label="所在地"
          id="location"
          value={location}
          inputType="text"
          onChange={inputLocation}
        />
        <TextInput
          placeholder=""
          label="従業委員数"
          id="staffNumber"
          value={staffNumber}
          inputType="text"
          onChange={inputStaffNumber}
        />
        <TextInput
          placeholder=""
          label="操業"
          id="startDate"
          value={startDate}
          inputType="date"
          onChange={inputStartDate}
        />
        <button
          className="w-full bg-green-500 text-white text-bold raund-md py-2 px-3 rounded-md hover:bg-green-400"
          onClick={() => dispatch(console.log({
            name,
            description,
            hp,
            industry,
            location,
            staffNumber,
            startDate,
          }))}
          type="button"
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default CompanyEdit;

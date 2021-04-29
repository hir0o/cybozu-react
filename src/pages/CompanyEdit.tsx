import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, ImgInput } from '../components/UiKid/index';
import { db } from '../firebase';
import { saveCompany } from '../reducks/companies/operations';
import { CompanyType } from '../reducks/companies/types';
import { useForm } from '../curtomhook';

const CompanyEdit: React.FC = () => {
  const id: string | undefined = window.location.pathname.split(
    '/companies/edit/',
  )[1];
  const dispatch = useDispatch();

  const [name, setName, inputName] = useForm('');
  const [description, setDescription, inputDescription] = useForm('');
  const [hp, setHp, inputHp] = useForm('');
  const [industry, setIndustry, inputIndustry] = useForm('');
  const [location, setLocation, inputLocation] = useForm('');
  const [profileImage, setProfileImage] = useState('');
  const [staffNumber, setStaffNumber, inputStaffNumber] = useForm('0');
  const [startDate, setStartDate, inputStartDate] = useForm('');

  useEffect(() => {
    if (id !== '' && id !== undefined) {
      void db
        .collection('companies')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data() as CompanyType;
          setName(data.name);
          setDescription(data.description);
          setHp(data.hp);
          setIndustry(data.industry);
          setLocation(data.location);
          if (data.profileImage !== undefined) {
            setProfileImage(data.profileImage);
          }
          setStaffNumber(`${data.staffNumber}`);
          setStartDate(data.startDate);
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
          onClick={() =>
            dispatch(
              saveCompany({
                id,
                name,
                description,
                profileImage,
                hp,
                industry,
                location,
                staffNumber: Number(staffNumber),
                startDate,
              }),
            )
          }
          type="button"
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default CompanyEdit;

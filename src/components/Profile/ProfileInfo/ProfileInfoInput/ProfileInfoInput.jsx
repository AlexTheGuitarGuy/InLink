import React, { memo } from 'react';
import { reduxForm } from 'redux-form';
import { maxLen } from '../../../../utils/validators/validators';
import placeholder from '../../../../assets/pfps/placeholder.jpg';
import Status from '../Status/Status';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import { useDispatch } from 'react-redux';
import { createField, Input } from '../../../common/FormControls/FormControls';
import { uploadPFP, uploadProfileInfo } from '../../../../redux/profile-reducer';

let ProfileInfoInputForm = ({
  isOwner,
  pfp,
  profileData: { contacts },
  profileStatus,
  maxLen1000,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const updatePFP = (e) => {
    if (e.target.files.length) dispatch(uploadPFP(e.target.files[0]));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex sm:flex-col lg:flex-row
      sm:align-center lg:justify-between
      bg-gray-100 rounded-lg p-8
      text-gray-700 font-semibold"
      >
        <div className="flex sm:flex-col lg:flex-row">
          <div className="sm:w-full">
            <img
              src={pfp || placeholder}
              alt={'pfp'}
              className="rounded-full bg-gray-700 p-1
                       w-52 h-52
                       xl:w-60 xl:h-60
                       sm:mx-auto"
            />
          </div>

          <div className="lg:mt-8 lg:ml-4 sm:flex sm:flex-col lg:flex-none">
            <div className="text-2xl sm:mx-auto lg:mx-0 xl:text-3xl">
              {createField('Please insert your name...', 'fullName', Input, null, null, {
                className: `p-2 rounded 
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition
                sm:text-center lg:text-left`,
              })}
            </div>

            <div className="mt-2 sm:mx-auto lg:mx-0">
              <Status status={profileStatus} isOwner={isOwner} />
            </div>

            <div className="mt-4">
              <button
                className="font-semibold
                    bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                    text-gray-100 text-center
                    rounded
                    transition-colors cursor-pointer
                    focus:outline-none focus:ring-0

                    lg:py-0.5 px-4
                    sm:py-2
                    sm:mb-4 lg:mb-0
                    sm:w-full lg:w-auto"
              >
                Save
              </button>
            </div>

            <div className="my-4">
              <div>Upload profile picture:</div>

              <input
                type={'file'}
                onChange={updatePFP}
                className="text-gray-700 font-semibold
                          transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:w-96 xl:w-1/2">
          <JobInfo maxLen={maxLen1000} />

          <Contacts contacts={contacts} />
        </div>
      </div>
    </form>
  );
};

ProfileInfoInputForm = reduxForm({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const ProfileInfoInput = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(uploadProfileInfo(payload));
  };

  return (
    <ProfileInfoInputForm
      onSubmit={handleSubmit}
      {...props}
      maxLen50={maxLen50}
      maxLen1000={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);

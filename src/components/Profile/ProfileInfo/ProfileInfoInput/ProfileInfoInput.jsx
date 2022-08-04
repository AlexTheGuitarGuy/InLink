import React, { memo } from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { maxLen } from '../../../../utils/validators/validators';
import placeholder from '../../../../assets/pfps/placeholder.jpg';
import Status from '../Status/Status';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import { connect } from 'react-redux';
import {
  createField,
  Input,
} from '../../../common/FormControls/FormControls';

let ProfileInfoInputForm = ({
  profileStatus,
  pfp,
  updateStatus,
  isOwner,
  uploadPFP,
  handleSubmit,
  profileData: { contacts },
  lookingForAJob,
  maxLen1000,
}) => {
  const updatePFP = (e) => {
    if (e.target.files.length) uploadPFP(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex justify-between
                   bg-gray-100 rounded-lg p-8
                   text-gray-700 font-semibold"
      >
        <div className="flex">
          <div>
            <img
              src={pfp || placeholder}
              alt={'pfp'}
              className="rounded-full w-52 bg-gray-700 p-1"
            />
          </div>

          <div className="mt-8 ml-4">
            <div className="text-2xl">
              {createField(
                'Please insert your name...',
                'fullName',
                Input,
                null,
                null,
                {
                  className: `p-2 rounded 
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition`,
                },
              )}
            </div>

            <div className="mt-2">
              <Status
                status={profileStatus}
                updateStatus={updateStatus}
                isOwner={isOwner}
              />
            </div>

            <div className="mt-4">
              <button
                className="font-semibold focus:outline-none focus:ring-0
                            bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                            text-gray-100 text-center
                            py-0.5 px-4 rounded
                            transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

            <div className="mt-4">
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

        <div className="flex flex-col w-96">
          <JobInfo
            lookingForAJob={lookingForAJob}
            maxLen={maxLen1000}
          />

          <Contacts contacts={contacts} />
        </div>
      </div>
    </form>
  );
};

ProfileInfoInputForm = reduxForm({
  form: 'profileInfo',
})(ProfileInfoInputForm);

const selector = formValueSelector('profileInfo');
ProfileInfoInputForm = connect((state) => {
  const lookingForAJob = selector(state, 'lookingForAJob');
  return {
    lookingForAJob,
  };
})(ProfileInfoInputForm);

const ProfileInfoInput = (props) => {
  const maxLen50 = maxLen(50);
  const maxLen1000 = maxLen(1000);

  const onSubmit = (payload) => {
    props.uploadProfileInfo(payload);
  };

  return (
    <ProfileInfoInputForm
      onSubmit={onSubmit}
      {...props}
      maxLen50={maxLen50}
      maxLen1000={maxLen1000}
      initialValues={props.profileData}
    />
  );
};

export default memo(ProfileInfoInput);

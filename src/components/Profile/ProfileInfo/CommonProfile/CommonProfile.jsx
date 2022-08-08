import placeholder from '../../../../assets/pfps/placeholder.jpg';
import React from 'react';
import EditButton from './EditButton/EditButton';
import Status from '../Status/Status';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import { useDispatch } from 'react-redux';
import { createField, Input } from '../../../common/FormControls/FormControls';
import { uploadPFP } from '../../../../redux/profile-reducer';

const CommonProfile = ({
  profileData: { lookingForAJob, lookingForAJobDescription, fullName, contacts },
  profileStatus,
  pfp,
  updateStatus,
  isOwner,
  isEditing,
  maxLen1000,
}) => {
  const dispatch = useDispatch();

  const updatePFP = (e) => {
    if (e.target.files.length) dispatch(uploadPFP(e.target.files[0]));
  };

  return (
    <div
      className="flex
      sm:flex-col lg:flex-row
      sm:align-center lg:justify-between
      lg:bg-gray-100 lg:rounded-lg 

      lg:p-8 
      sm:mx-4 lg:mx-0
      sm:pt-8
      sm:mb-4 lg:mb-0


      text-gray-700 font-semibold
      sm:text-sm"
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
            {isEditing
              ? createField('Please insert your name...', 'fullName', Input, null, null, {
                  className: `p-2 rounded 
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition
                sm:text-center lg:text-left`,
                })
              : fullName}
          </div>

          <div className="mt-2 sm:mx-auto lg:mx-0">
            <Status status={profileStatus} updateStatus={updateStatus} isOwner={isOwner} />
          </div>

          {isOwner && (
            <div className="mt-4">
              <EditButton isEditing={isEditing} />
            </div>
          )}

          {isOwner && isEditing && (
            <div className="my-4">
              <div>Upload profile picture:</div>

              <input
                type={'file'}
                onChange={updatePFP}
                className="text-gray-700 font-semibold
                                      transition-colors cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:w-96 xl:w-1/2">
        <JobInfo
          maxLen={maxLen1000}
          reduxLookingForAJob={lookingForAJob}
          isEditing={isEditing}
          lookingForAJobDescription={lookingForAJobDescription}
        />

        <Contacts contacts={contacts} isEditing={isEditing} />
      </div>
    </div>
  );
};

export default CommonProfile;

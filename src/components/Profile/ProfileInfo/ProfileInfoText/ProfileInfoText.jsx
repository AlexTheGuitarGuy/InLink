import placeholder from '../../../../assets/pfps/placeholder.jpg';
import React, { memo } from 'react';
import EditButton from './EditButton/EditButton';
import Status from '../Status/Status';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';

const ProfileInfoText = ({
  profileData: {
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    contacts,
  },
  profileStatus,
  pfp,
  updateStatus,
  isOwner,
}) => {
  return (
    <div
      className="flex
      sm:flex-col lg:flex-row
      sm:align-center lg:justify-between
      bg-gray-100 lg:rounded-lg p-8
      text-gray-700 font-semibold
      xl:text-xl"
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
            {fullName}
          </div>

          <div className="mt-2 sm:mx-auto lg:mx-0">
            <Status
              status={profileStatus}
              updateStatus={updateStatus}
              isOwner={isOwner}
            />
          </div>

          {isOwner && (
            <div className="mt-4">
              <EditButton />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:w-96 xl:w-1/2">
        <JobInfo
          lookingForAJob={lookingForAJob}
          lookingForAJobDescription={lookingForAJobDescription}
        />

        <Contacts contacts={contacts} />
      </div>
    </div>
  );
};

export default memo(ProfileInfoText);

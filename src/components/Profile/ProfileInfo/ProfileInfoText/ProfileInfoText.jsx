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
      className="flex justify-between
      bg-gray-100 rounded-lg p-8
      text-gray-700 font-semibold"
    >
      <div className="flex">
        <div>
          <img
            src={pfp || placeholder}
            alt={'pfp'}
            className="rounded-full w-52 h-52 bg-gray-700 p-1"
          />
        </div>

        <div className="mt-8 ml-4">
          <div className="text-2xl">{fullName}</div>

          <div className="mt-2">
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

      <div className="flex flex-col w-96">
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

import banner from '../../../../assets/banner.jpg';
import s from './ProfileInfoText.module.css';
import placeholder from '../../../../assets/pfps/placeholder.jpg';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import Status from '../Status/Status';
import React, { memo } from 'react';
import UserName from './UserName/UserName';
import EditButton from './EditButton/EditButton';

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
  setEditing,
}) => {
  return (
    <div>
      <img
        src={banner}
        alt="banner"
        className={s.banner + ' w-full'}
      />

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={pfp || placeholder} alt={'pfp'} />
        </div>

        <span className={s.jobInfo}>
          <EditButton isOwner={isOwner} setEditing={setEditing} />

          <JobInfo
            lookingForAJob={lookingForAJob}
            lookingForAJobDescription={lookingForAJobDescription}
          />
        </span>

        <div className={s.details}>
          <span className={s.username}>
            <UserName fullName={fullName} />
          </span>

          <span className={s.status}>
            <Status
              status={profileStatus}
              updateStatus={updateStatus}
              isOwner={isOwner}
            />
          </span>

          <span className={s.contacts}>
            <Contacts contacts={contacts} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileInfoText);

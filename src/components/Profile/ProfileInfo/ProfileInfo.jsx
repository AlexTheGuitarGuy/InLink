import banner from '../../../assets/banner.jfif';
import s from './ProfileInfo.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import Status from './Status/Status';
import React from 'react';

const ProfileInfo = ({
  profileData: {
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    contacts,
  },
  profileStatus,
  pfp,
  updateStatus,
  canEdit,
}) => {
  return (
    <div>
      <img src={banner} alt="banner" className={s.banner} />

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={pfp || placeholder} alt={'pfp'} />
        </div>

        <JobInfo
          lookingForAJob={lookingForAJob}
          lookingForAJobDescription={lookingForAJobDescription}
        />

        <div className={s.details}>
          <div className={s.username}>{fullName}</div>
          <Status
            status={profileStatus}
            updateStatus={updateStatus}
            canEdit={canEdit}
          />
          <Contacts contacts={contacts} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileInfo);

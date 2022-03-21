import banner from '../../../assets/banner.jfif';
import s from './ProfileInfo.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';
import Status from './Status/Status';

const ProfileInfo = ({
  profileData,
  profileStatus,
  pfp,
  updateStatus,
  canEdit,
}) => {
  let jobInfoParams = {
    lookingForAJob: profileData.lookingForAJob,
    lookingForAJobDescription: profileData.lookingForAJobDescription,
  };

  return (
    <div>
      <img src={banner} alt="banner" className={s.banner} />

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={pfp || placeholder} alt={'pfp'} />
        </div>

        <JobInfo {...jobInfoParams} />

        <div className={s.details}>
          <div className={s.username}>{profileData.fullName}</div>
          <Status
            status={profileStatus}
            updateStatus={updateStatus}
            canEdit={canEdit}
          />
          <Contacts contacts={profileData.contacts} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

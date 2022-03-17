import banner from '../../../assets/banner.jfif';
import s from './ProfileInfo.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import JobInfo from './JobInfo/JobInfo';
import Contacts from './Contacts/Contacts';

const ProfileInfo = ({profileData, pfp}) => {
  return (
    <div>
      <img src={banner} alt="banner" className={s.banner} />

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={pfp || placeholder} alt={'pfp'} />
        </div>

        <JobInfo profileData={profileData}/>

        <div className={s.details}>
          <div className={s.username}>
            {profileData.fullName}
          </div>

          <div className={s.description}>
            {profileData.aboutMe}
          </div>

          <Contacts contacts={profileData.contacts} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

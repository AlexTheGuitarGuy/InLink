import banner from '../../../assets/banner.jfif';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src={banner} alt="banner" className={s.banner} />
      </div>

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>{props.pfp}</div>

        <div className={s.details}>
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description + description + description + description +
          description
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

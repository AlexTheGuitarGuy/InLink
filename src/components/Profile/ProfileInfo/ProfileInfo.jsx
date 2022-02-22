import banner from '../../../assets/banner.jfif';
import s from './ProfileInfo.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const ProfileInfo = (props) => {
  let redirect = (link) => {};
  let contacts = props.profileData.contacts;

  let isEmpty = true,
    i;
  for (i in contacts)
    if (contacts.hasOwnProperty(i)) {
      if (contacts[i]) {
        isEmpty = false;
        break;
      }
    }
  return (
    <div>
      <img src={banner} alt="banner" className={s.banner} />

      <div className={s.pfpAndDetails}>
        <div className={s.pfp}>
          <img src={props.pfp || placeholder} alt={'pfp'} />
        </div>

        {props.profileData.lookingForAJob && (
          <div className={s.job}>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
                alt="looking for job"
              />
              <span className={s.jobText}>
                {'is looking for a job'}
              </span>
              <div className={s.jobDescription}>
                {'"' +
                  props.profileData.lookingForAJobDescription +
                  '"'}
              </div>
            </div>
          </div>
        )}
        <div className={s.details}>
          <div className={s.username}>
            {props.profileData.fullName}
          </div>
          <div className={s.description}>
            {props.profileData.aboutMe}
          </div>
          {!isEmpty && (
            <div className={s.contacts}>
              Contacts:
              <div>
                <span className={s.contactImages}>
                  {contacts.facebook && (
                    <img
                      src="https://pnggrid.com/wp-content/uploads/2021/05/Facebook-logo-2021.png"
                      alt="facebook"
                      onClick={() => {
                        redirect(contacts.facebook);
                      }}
                    />
                  )}

                  {contacts.vk && (
                    <img
                      src="https://freepikpsd.com/file/2019/10/vk-logo-png-7-Transparent-Images.png"
                      alt="vk"
                      onClick={() => {
                        redirect(contacts.vk);
                      }}
                    />
                  )}

                  {contacts.twitter && (
                    <img
                      src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png"
                      alt="twitter"
                      onClick={() => {
                        redirect(contacts.twitter);
                      }}
                    />
                  )}

                  {contacts.instagram && (
                    <img
                      src="https://straightarrowfilms.com/wp-content/uploads/2020/05/new-instagram-logo-png-transparent-light.png"
                      alt="instagram"
                      onClick={() => {
                        redirect(contacts.instagram);
                      }}
                    />
                  )}

                  {contacts.youtube && (
                    <img
                      src="https://www.designbust.com/download/1005/png/transparent_background_youtube_logo_png512.png"
                      alt="youtube"
                      onClick={() => {
                        redirect(contacts.youtube);
                      }}
                    />
                  )}

                  {contacts.github && (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt="github"
                      onClick={() => {
                        redirect(contacts.github);
                      }}
                    />
                  )}
                </span>
                {contacts.website && (
                  <div
                    onClick={() => {
                      redirect(contacts.website);
                    }}
                  >
                    website
                  </div>
                )}
                {contacts.mainLink && (
                  <div
                    onClick={() => {
                      redirect(contacts.mainLink);
                    }}
                  >
                    main link
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

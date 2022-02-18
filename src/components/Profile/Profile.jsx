import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import Loading from '../common/Loading';

const Profile = (props) => {
  return (
    <div className={s.content}>
      <div className={s.formatting}>
        {(props.state.profileData && (
          <ProfileInfo
            pfp={props.state.profileData.photos.large}
            profileData={props.state.profileData}
          />
        )) || <Loading class={s.loadImg} />}
        <MyPostsContainer />
      </div>
    </div>
  );
};

export default Profile;

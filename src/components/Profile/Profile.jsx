import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import Loading from '../common/Loading';

const Profile = (props) => {
  return (
    <div className={s.content}>
      <div className={s.formatting}>
        <ProfileInfo
          pfp={
            (props.state.profileData &&
              props.state.profileData.photos.large) || (
              <Loading class={s.loadImg} />
            )
          }
        />
        <MyPostsContainer />
      </div>
    </div>
  );
};

export default Profile;

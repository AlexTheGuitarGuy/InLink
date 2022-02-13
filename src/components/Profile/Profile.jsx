import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  return (
    <div className={s.content}>
      <div className={s.formatting}>
        <ProfileInfo pfp={props.profileData.pfp} />
        <MyPostsContainer />
      </div>
    </div>
  );
};

export default Profile;

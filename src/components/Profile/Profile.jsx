import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loading from '../common/Loading/Loading';

const Profile = (props) => {
  return (
    <div>
      {(!props.isLoading && props.state.profileData && (
        <ProfileInfo
          pfp={props.state.profileData.photos.large}
          profileData={props.state.profileData}
          profileStatus={props.state.profileStatus}
          updateStatus={props.updateStatus}
          canEdit={props.canEdit}
        />
      )) || <Loading class={s.loadImg} />}
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

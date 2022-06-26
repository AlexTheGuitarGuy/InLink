import React, { lazy } from 'react';
import Loading from '../common/Loading/Loading';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfoText from './ProfileInfo/ProfileInfoText/ProfileInfoText';

const ProfileInfoInput = lazy(() =>
  import('./ProfileInfo/ProfileInfoInput/ProfileInfoInput').then(
    ({ default: ProfileInfoInput }) => ({
      default: ProfileInfoInput,
    }),
  ),
);

const Profile = ({
  isLoading,
  state: { profileData, profileStatus },
  updateStatus,
  isOwner,
  uploadPFP,
  posts,
  post,
  uploadProfileInfo,
  submitStatus,
  setEditing,
  isEditing,
}) => {
  if (isLoading || !profileData) return <Loading />;
  if (!isOwner && isEditing) setEditing(false);

  return (
    <div>
      {isEditing && isOwner ? (
        <ProfileInfoInput
          uploadPFP={uploadPFP}
          isOwner={isOwner}
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          uploadProfileInfo={uploadProfileInfo}
          setEditing={setEditing}
          submitStatus={submitStatus}
        />
      ) : (
        <ProfileInfoText
          isOwner={isOwner}
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          setEditing={setEditing}
        />
      )}
      <MyPosts
        isOwner={isOwner}
        posts={posts}
        post={post}
        pfp={profileData.photos.small}
        userName={profileData.fullName}
      />
    </div>
  );
};

export default Profile;

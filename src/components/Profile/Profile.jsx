import React, { lazy, useState } from 'react';
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
}) => {
  const [isEditing, setEditing] = useState(false);

  if (isLoading || !profileData) return <Loading />;

  return (
    <div>
      {isEditing ? (
        <ProfileInfoInput
          uploadPFP={uploadPFP}
          isOwner={isOwner}
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          uploadProfileInfo={uploadProfileInfo}
          isEditing={isEditing}
          setEditing={setEditing}
        />
      ) : (
        <ProfileInfoText
          uploadPFP={uploadPFP}
          isOwner={isOwner}
          pfp={profileData.photos.large}
          profileData={profileData}
          profileStatus={profileStatus}
          updateStatus={updateStatus}
          uploadProfileInfo={uploadProfileInfo}
          isEditing={isEditing}
          setEditing={setEditing}
        />
      )}
      <MyPosts posts={posts} post={post} />
    </div>
  );
};

export default Profile;

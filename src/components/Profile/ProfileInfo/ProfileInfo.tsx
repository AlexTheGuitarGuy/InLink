import React, { FC, ChangeEvent, useState } from 'react'

import {
  followInProfile,
  unfollowInProfile,
  uploadPFP,
} from '../../../redux/profile-reducer/profile-reducer'

import placeholder from '../../../assets/pfps/placeholder.jpg'

import { InputProfileData } from '../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import Status from './Status/Status'
import JobInfo from './JobInfo/JobInfo'
import Contacts from './Contacts/Contacts'
import FollowButton from '../../common/Buttons/FollowButton/FollowButton'
import { getCurrentUserFollowed, getUserId } from '../../../redux/profile-reducer/profile-selector'
import EditProfileDialog from './EditProfileDialog/EditProfileDialog'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'

export type ProfileInfoProps = {
  isOwner: boolean
  pfp: string
  profileData: InputProfileData
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  isOwner,
  pfp,
  profileData: { lookingForAJob, lookingForAJobDescription, fullName, contacts, aboutMe },
}) => {
  const dispatch = useAppDispatch()
  const currentUserFollowed = useAppSelector(getCurrentUserFollowed)
  const id = useAppSelector(getUserId)!
  const updatePFP = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement
    const fileList: FileList | null = element.files
    if (fileList) dispatch(uploadPFP(fileList[0]))
  }

  const [isEditShown, setIsEditShown] = useState(false)

  return (
    <div
      className='flex
                  sm:flex-col lg:flex-row
                  sm:align-center lg:justify-between
                  lg:bg-gray-100 lg:rounded-lg 

                  lg:p-8 
                  sm:mx-4 lg:mx-0
                  sm:pt-8
                  sm:mb-4 lg:mb-0


                  text-gray-700 font-semibold
                  sm:text-sm'
    >
      <EditProfileDialog
        isShown={isEditShown}
        onClose={() => setIsEditShown(false)}
        profileData={{ lookingForAJob, lookingForAJobDescription, fullName, contacts, id, aboutMe }}
      />
      <div className='flex sm:flex-col lg:flex-row'>
        <div className='sm:w-full'>
          <img
            src={pfp || placeholder}
            alt='pfp'
            className='rounded-full bg-gray-700 p-1
                       w-52 h-52
                       xl:w-60 xl:h-60
                       sm:mx-auto'
          />
        </div>

        <div className='lg:mt-8 lg:ml-4 sm:flex sm:flex-col lg:flex-none'>
          <div className='text-2xl sm:mx-auto lg:mx-0 xl:text-3xl'>{fullName}</div>
          <div className='mt-2 sm:mx-auto lg:mx-0'>
            <Status isOwner={isOwner} />
          </div>
          <div className='mt-3 mx-auto lg:mx-0 '>
            {isOwner ? (
              <PrimaryButton
                onClick={() => setIsEditShown(true)}
                className='lg:py-0.5 lg:px-4
                          py-2 sm:px-6
                          mb-4 lg:mb-0'
              >
                Edit
              </PrimaryButton>
            ) : (
              <FollowButton
                id={id}
                followed={currentUserFollowed}
                onFollow={() => dispatch(followInProfile(id))}
                onUnfollow={() => dispatch(unfollowInProfile(id))}
              />
            )}
          </div>
          {isOwner && (
            <div className='my-4'>
              <div>Upload profile picture:</div>

              <input
                type='file'
                onChange={updatePFP}
                className='text-gray-700 font-semibold
                              transition-colors cursor-pointer'
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col lg:w-96 xl:w-1/2'>
        <JobInfo
          lookingForAJob={lookingForAJob}
          lookingForAJobDescription={lookingForAJobDescription}
          isEditMode={false}
        />

        <Contacts contacts={contacts} isEditMode={false} />
      </div>
    </div>
  )
}

export default ProfileInfo

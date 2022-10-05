import React, { FC, ChangeEvent } from 'react'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { uploadPFP, uploadProfileInfo } from '../../../redux/profile-reducer/profile-reducer'

import placeholder from '../../../assets/pfps/placeholder.jpg'

import { InputProfileData } from '../../../types/types'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import FormInput from '../../common/Inputs/FormInput/FormInput'

import EditButton from './EditButton/EditButton'
import Status from './Status/Status'
import JobInfo from './JobInfo/JobInfo'
import Contacts from './Contacts/Contacts'

export type ProfileInfoProps = {
  isOwner: boolean
  isEditing: boolean
  pfp: string
  profileData: InputProfileData
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  isOwner,
  isEditing,
  pfp,
  profileData: { lookingForAJob, lookingForAJobDescription, fullName, contacts },
}) => {
  const dispatch = useAppDispatch()

  const updatePFP = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement
    const fileList: FileList | null = element.files
    if (fileList) dispatch(uploadPFP(fileList[0]))
  }

  const initialValues = {
    aboutMe: 'about me',
    contacts,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
  }

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .trim()
      .required('Name is required')
      .max(20, 'Name should be at most 20 characters long.'),
    lookingForAJobDescription: Yup.string()
      .trim()
      .max(256, 'Too much text. Maximum is 256 characters')
      .when('lookingForAJob', {
        is: true,
        then: Yup.string().required('This field is required'),
      }),
  })

  const onSubmit = async (
    values: InputProfileData,
    { setStatus, setSubmitting }: FormikHelpers<InputProfileData>,
  ) => {
    dispatch(uploadProfileInfo(values, setStatus))
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, isSubmitting, isValid, status }: FormikProps<InputProfileData>) => (
        <Form
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
              <div className='text-2xl sm:mx-auto lg:mx-0 xl:text-3xl'>
                {isEditing ? (
                  <FormInput
                    field={{
                      type: 'text',
                      name: 'fullName',
                      placeholder: 'Please insert your name...',
                      className: 'sm:text-center lg:text-left p-2 ',
                    }}
                  />
                ) : (
                  fullName
                )}
              </div>
              <div className='mt-2 sm:mx-auto lg:mx-0'>
                <Status isOwner={isOwner} />
              </div>
              {isOwner && (
                <div className='mt-4'>
                  <EditButton isEditing={isEditing} isSubmitting={isSubmitting} isValid={isValid} />
                </div>
              )}
              {isOwner && isEditing && (
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
              lookingForAJob={values.lookingForAJob}
              lookingForAJobDescription={lookingForAJobDescription}
              isEditing={isEditing}
            />

            <Contacts contacts={contacts} isEditing={isEditing} status={status} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileInfo

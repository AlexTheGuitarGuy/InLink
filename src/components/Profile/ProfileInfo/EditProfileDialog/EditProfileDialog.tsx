import React, { FC } from 'react'
import BaseDialog from '../../../common/Dialogs/BaseDialog/BaseDialog'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { InputProfileData } from '../../../../types/types'
import FormInput from '../../../common/Inputs/FormInput/FormInput'
import { uploadProfileInfo } from '../../../../redux/profile-reducer/profile-reducer'
import JobInfo from '../JobInfo/JobInfo'
import Contacts from '../Contacts/Contacts'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { getUserId } from '../../../../redux/profile-reducer/profile-selector'
import * as Yup from 'yup'

type EditProfileDialogProps = {
  profileData: InputProfileData
  onClose: () => void
  isShown: boolean
}

const EditProfileDialog: FC<EditProfileDialogProps> = ({
  onClose,
  isShown,
  profileData: { lookingForAJob, lookingForAJobDescription, fullName, contacts },
}) => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(getUserId)!

  const initialValues = {
    aboutMe: 'about me',
    contacts,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    id,
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
    { setStatus, setSubmitting, resetForm }: FormikHelpers<InputProfileData>,
  ) => {
    dispatch(uploadProfileInfo(values, setStatus)).then(({ success }: { success: boolean }) => {
      if (success) {
        resetForm({ values: initialValues })
        onClose()
      }
    })
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, status, errors, submitForm, resetForm }: FormikProps<InputProfileData>) => (
        <BaseDialog
          isShown={isShown}
          onClose={() => {
            resetForm({ values: initialValues })
            onClose()
          }}
          onSubmit={() => submitForm()}
          name='Edit profile data'
        >
          <Form className='bg-gray-200 lg:w-[600px] md:w-[450px] w-[300px] overflow-y-scroll'>
            <div className='w-3/4 mx-auto py-4 space-y-10'>
              <div>
                <FormInput
                  label={{ text: 'Name' }}
                  error={{ isError: !!errors.fullName }}
                  field={{
                    type: 'text',
                    name: 'fullName',
                    placeholder: 'Please insert your name...',
                  }}
                />
              </div>

              <JobInfo
                lookingForAJob={values.lookingForAJob}
                lookingForAJobDescription={lookingForAJobDescription}
                isError={!!errors.lookingForAJobDescription}
                isEditMode={true}
              />

              <Contacts contacts={contacts} isEditMode={true} status={status} />
            </div>
          </Form>
        </BaseDialog>
      )}
    </Formik>
  )
}

export default EditProfileDialog

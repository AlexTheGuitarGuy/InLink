import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { FC, useMemo } from 'react'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { uploadProfileInfo } from '@/redux/profile-reducer/profile-reducer'
import { getUserId } from '@/redux/profile-reducer/profile-selector'
import { ContactsObj, InputProfileData } from '@/types'
import BaseDialog from '@/components/common/Dialogs/BaseDialog/BaseDialog'
import FormInput from '@/components/common/Inputs/FormInput/FormInput'
import Contacts from '../Contacts/Contacts'
import JobInfo from '../JobInfo/JobInfo'

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

  const formattedContacts = useMemo(() => {
    return Object.entries(contacts)
      .map(([key, value]) => ({ key, value: value || '' }))
      .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {} as ContactsObj)
  }, [contacts])

  const initialValues = {
    aboutMe: 'about me',
    contacts: formattedContacts,
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
    dispatch(uploadProfileInfo(values, setStatus)).then((result) => {
      if (result?.success) {
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
          <Form className='bg-neutralBg lg:w-[600px] md:w-[450px] w-[300px] overflow-y-scroll'>
            <div className='w-3/4 mx-auto py-4 space-y-10'>
              <div>
                <FormInput
                  label={{ text: 'Name' }}
                  error={{ iserror: !!errors.fullName }}
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

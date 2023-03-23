import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'

import FormInput from '../../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../../common/Buttons/PrimaryButton/PrimaryButton'

type PostFormValues = {
  postText: string
}

const PublishPost = () => {
  const dispatch = useDispatch()

  const initialValues: PostFormValues = {
    postText: '',
  }

  const validationSchema = Yup.object({
    postText: Yup.string().trim().max(512, 'Post too long. Maximum is 512 characters.'),
  })

  const onSubmit = (
    { postText }: PostFormValues,
    { resetForm, setSubmitting }: FormikHelpers<PostFormValues>,
  ) => {
    if (postText.trim()) {
      dispatch(profileActions.createPost(postText))
      resetForm()
    }
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<PostFormValues>) => (
        <Form>
          <FormInput
            error={{ isError: !isValid }}
            label={{ text: 'New Post', className: 'lg:text-lg xl:text-2xl xl:mb-2' }}
            field={{
              as: 'textarea',
              name: 'postText',
              placeholder: 'Type what you think...',
              className: 'resize-none py-2 px-4 w-full mb-2',
            }}
          />

          <PrimaryButton
            disabled={isSubmitting || !isValid}
            type='submit'
            className='text-sm text-center py-1.5 px-4 rounded w-full'
          >
            Publish
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  )
}

export default PublishPost

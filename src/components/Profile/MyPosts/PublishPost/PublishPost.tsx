import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'

import FormInput from '../../../common/Inputs/FormInput/FormInput'

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
      dispatch(profileActions.post(postText))
      resetForm()
    }
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<PostFormValues>) => (
        <Form>
          <FormInput
            label={{ text: 'New Post', className: 'lg:text-lg xl:text-2xl xl:mb-2' }}
            field={{
              as: 'textarea',
              name: 'postText',
              placeholder: 'Type what you think...',
              id: 'postText',
              className: 'resize-none py-2 px-4 w-full',
            }}
          />

          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                      text-gray-100 text-center font-semibold text-sm

                      lg:py-1.5
                      sm:py-0.5 px-4 

                      rounded w-full
                      transition-colors cursor-pointer
                      focus:outline-none focus:ring-0'
          >
            Publish
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default PublishPost

import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import FormInput from '../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'

type MessageFormValues = {
  messageText: string
}

type SendTextProps = {
  id: number
}

const SendText: FC<SendTextProps> = ({ id }) => {
  const dispatch = useDispatch()

  const initialValues = {
    messageText: '',
  }

  const maxMessageLen = 512
  const validationSchema = Yup.object({
    messageText: Yup.string()
      .trim()
      .max(maxMessageLen, `Message too long. Maximum is ${maxMessageLen} characters.`),
  })

  const onSubmit = (
    { messageText }: MessageFormValues,
    { resetForm, setSubmitting }: FormikHelpers<MessageFormValues>,
  ) => {
    if (messageText.trim()) {
      dispatch(dialogsActions.sendMessage(id, messageText))
      resetForm()
    }
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<MessageFormValues>) => (
        <Form>
          <div className='flex flex-row justify-center'>
            <FormInput
              field={{
                as: 'textarea',
                name: 'messageText',
                placeholder: 'Enter your message...',
                className: 'resize-none w-full rounded-lg p-2',
              }}
            />

            <PrimaryButton
              disabled={isSubmitting || !isValid}
              type='submit'
              className='rounded-full ml-4 p-3 mt-2'
              color='gray'
            >
              <img src={require('../../../assets/send.png')} alt='Send' className='w-8 h-8 mr-3' />
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SendText

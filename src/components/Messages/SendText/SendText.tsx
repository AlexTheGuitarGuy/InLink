import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import FormInput from '../../common/Inputs/FormInput/FormInput'

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

            <div>
              <button
                disabled={isSubmitting || !isValid}
                type='submit'
                className='bg-gray-400 hover:bg-gray-500 active:bg-gray-600
                          text-gray-100 text-center
                          rounded-full ml-4 px-2 py-2 mt-2
                          transition-colors cursor-pointer
                          focus:outline-none focus:ring-0'
              >
                <img
                  src={require('../../../assets/send.png')}
                  alt='Send'
                  className='w-8 h-8 mr-3'
                />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SendText

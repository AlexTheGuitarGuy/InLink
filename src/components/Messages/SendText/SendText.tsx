import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import FormInput from '../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import { Send } from '@mui/icons-material'

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
              error={{ isError: !isValid }}
              field={{
                as: 'textarea',
                name: 'messageText',
                placeholder: 'Enter your message...',
                className: 'resize-none w-full rounded-lg p-2',
              }}
            />
            <div className='flex items-center'>
              <PrimaryButton
                disabled={isSubmitting || !isValid}
                type='submit'
                className='rounded-full ml-4 shadow-none h-12 w-12 flex justify-center items-center'
                color='background'
              >
                <Send fontSize='medium' className='text-gray-700' />
              </PrimaryButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SendText

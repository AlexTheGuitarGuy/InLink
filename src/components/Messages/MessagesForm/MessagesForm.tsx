import React, { ChangeEvent, FC } from 'react'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import FormInput from '../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import { Send } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getStoredMessages } from '../../../redux/dialogs-reducer/dialogs-selector'

type MessageFormValues = {
  messageText: string
}

type SendTextProps = {
  index: number
}

const MessagesForm: FC<SendTextProps> = ({ index }) => {
  const dispatch = useAppDispatch()
  const storedMessages = useAppSelector(getStoredMessages)

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
      dispatch(dialogsActions.sendMessage(index, messageText))
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
                restprops: {
                  onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    dispatch(dialogsActions.storeMessage(event.target.value, index)),
                  value: storedMessages[index],
                },
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

export default MessagesForm

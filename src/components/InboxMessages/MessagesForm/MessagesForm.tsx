import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { ChangeEvent, FC } from 'react'
import * as Yup from 'yup'

import { Send } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { dialogsActions } from '@/redux/dialogs-reducer/dialogs-reducer'
import { getStoredMessages } from '@/redux/dialogs-reducer/dialogs-selector'
import PrimaryButton, { ButtonColor } from '@/components/common/Buttons/PrimaryButton/PrimaryButton'
import FormInput from '@/components/common/Inputs/FormInput/FormInput'

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
    messageText: storedMessages[index] || '',
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
      dispatch(dialogsActions.storeMessage('', index))
      resetForm({ values: { messageText: '' } })
    }
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid, handleChange, values }: FormikProps<MessageFormValues>) => (
        <Form>
          <div className='flex flex-row justify-center'>
            <FormInput
              error={{ iserror: !isValid }}
              field={{
                as: 'textarea',
                name: 'messageText',
                placeholder: 'Enter your message...',
                className: 'resize-none rounded-lg',
                restprops: {
                  onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                    dispatch(dialogsActions.storeMessage(event.target.value, index))
                  },
                },
              }}
            />
            <div className='flex items-center'>
              <PrimaryButton
                disabled={isSubmitting || !isValid || !values.messageText.trim()}
                type='submit'
                className='rounded-full ml-4 h-12 w-12 flex justify-center items-center active:ring-onPrimaryBg shadow-none'
                color={ButtonColor.transparent}
              >
                <Send fontSize='medium' />
              </PrimaryButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MessagesForm

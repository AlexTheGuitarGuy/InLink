import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Send } from '@mui/icons-material'

import { sendMessage } from '../../../redux/chat-reducer/chat-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import FormInput from '../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import { getStatus } from '../../../redux/chat-reducer/chat-selector'

type ChatFormValues = {
  messageText: string
}

const PostText = () => {
  const status = useAppSelector(getStatus)

  const dispatch = useAppDispatch()

  const initialValues = {
    messageText: '',
  }

  const maxMessageLen = 256
  const validationSchema = Yup.object({
    messageText: Yup.string()
      .trim()
      .max(maxMessageLen, `Message too long. Maximum is ${maxMessageLen} characters.`),
  })

  const onSubmit = (
    { messageText }: ChatFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ChatFormValues>,
  ) => {
    if (messageText.trim()) {
      dispatch(sendMessage(messageText))
      resetForm()
    }
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<ChatFormValues>) => (
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
            <div className='flex items-center'>
              <PrimaryButton
                disabled={isSubmitting || !isValid || status !== 'ready'}
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

export default PostText

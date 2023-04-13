import { Clear, Done } from '@mui/icons-material'
import cn from 'classnames'
import { Form, Formik } from 'formik'
import { ChangeEvent, FC, useState } from 'react'
import FormInput from '../FormInput/FormInput'

export enum EditTextButtonColor {
  neutral = 'neutral',
  primary = 'primary',
}

export type EditTextProps = {
  text: string
  onDone: (text: string) => void
  onClear: () => void
  textAreaClassName?: string
  buttonsColor?: EditTextButtonColor
}

const EditText: FC<EditTextProps> = ({
  text,
  onDone,
  onClear,
  textAreaClassName,
  buttonsColor = EditTextButtonColor.neutral,
}) => {
  const [dynamicText, setDynamicText] = useState(text)
  let buttonsTextColor = ''
  let buttonsBackground = ''

  switch (buttonsColor) {
    case EditTextButtonColor.neutral: {
      buttonsBackground = 'hover:bg-neutralBg'
      break
    }
    case EditTextButtonColor.primary: {
      buttonsBackground = 'hover:bg-primaryChild'
      break
    }
  }

  return (
    <Formik initialValues={{ dynamicText }} onSubmit={() => {}}>
      {({ handleSubmit, handleReset }) => (
        <Form>
          <FormInput
            field={{
              name: 'dynamicText',
              placeholder: 'Edit post...',
              className: textAreaClassName,
              as: 'textarea',
              restprops: {
                onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
                  setDynamicText(event.target.value)
                },
                value: dynamicText,
              },
            }}
          />
          <div className={cn('flex justify-end mt-2 bg-neutral', buttonsTextColor)}>
            <button
              type='submit'
              className={cn('cursor-pointer rounded', buttonsBackground)}
              onClick={() => {
                handleSubmit()
                onDone(dynamicText)
              }}
            >
              <Done />
            </button>

            <button
              type='reset'
              className={cn('cursor-pointer rounded', buttonsBackground)}
              onClick={(event) => {
                handleReset(event)
                setDynamicText(text)
                onClear()
              }}
            >
              <Clear />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditText

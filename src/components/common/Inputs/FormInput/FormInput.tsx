import cn from 'classnames'
import { ErrorMessage, Field } from 'formik'
import { FC } from 'react'

type FormInputProps = {
  field: {
    type?: string
    name?: string
    placeholder?: string
    as?: 'input' | 'textarea'
    className?: string
    restprops?: any
  }
  error?: {
    className?: string
    iserror: boolean
  }
  otherError?: { text?: string; className?: string }
  label?: {
    text: string
    className?: string
  }
}

const FormInput: FC<FormInputProps> = ({
  field: { type = 'text', ...field },
  error,
  otherError,
  label,
}) => {
  const isError = error?.iserror || otherError?.text
  return (
    <span className='flex flex-col w-full'>
      {label && (
        <label htmlFor={field.name || ''} className={cn(label.className, { 'text-rose-800': isError })}>
          {label.text}
        </label>
      )}
      <Field
        {...field}
        {...field.restprops}
        id={field.name || ''}
        type={type}
        className={cn(
          `rounded 
                    border border-onNeutralBg border-solid bg-neutralChild
                    focus:outline-none focus:ring-2 focus:ring-primaryFocus
                    transition ease-in-out
                    bg-clip-padding
                    px-3 py-2 w-full`,
          field.className,
          { 'bg-rose-50 border-rose-300 focus:ring-rose-600 text-rose-800': isError },
        )}
      />
      <small
        className={cn(
          `text-rose-700 whitespace-nowrap text-sm`,
          otherError?.className,
          error?.className,
        )}
      >
        {otherError?.text || (
          <ErrorMessage
            name={field.name || ''}
            {...error}
            component='div'
            className={cn(error?.className)}
          />
        )}
      </small>
    </span>
  )
}
export default FormInput

import { ErrorMessage, Field } from 'formik'
import { FC } from 'react'
import cn from 'classnames'

type FormInputProps = {
  field: {
    type?: string
    name: string
    placeholder?: string
    as?: 'input' | 'textarea'
    className?: string
    restprops?: any
  }
  error?: {
    className?: string
    isError: boolean
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
  const isError = error?.isError || otherError?.text
  return (
    <>
      {label && (
        <label htmlFor={field.name} className={cn(label.className, { 'text-rose-800': isError })}>
          {label.text}
        </label>
      )}
      <Field
        {...field}
        {...field.restprops}
        id={field.name}
        type={type}
        className={cn(
          `rounded 
                    border border-gray-300 border-solid
                    focus:outline-none focus:border-gray-600
                    transition ease-in-out
                    bg-clip-padding
                    px-3 py-2 w-full`,
          field.className,
          { 'bg-rose-50 border-rose-300 focus:border-rose-600 text-rose-800': isError },
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
            name={field.name}
            {...error}
            component='div'
            className={cn(error?.className)}
          />
        )}
      </small>
    </>
  )
}
export default FormInput

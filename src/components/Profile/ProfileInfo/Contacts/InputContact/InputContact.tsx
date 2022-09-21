import { FC } from 'react'
import { ContactProps } from '../Contacts'
import { ErrorMessage, Field } from 'formik'

const InputContact: FC<ContactProps> = ({ contactName, error }) => {
  return (
    <div className='mt-3'>
      <label htmlFor={contactName}>{contactName}:</label>
      <span className='ml-2 text-gray-700'>
        <Field
          type='text'
          name={'contacts.' + contactName}
          placeholder={'insert ' + contactName}
          className='p-1 rounded w-full
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition'
          id={contactName}
        />
        {error ? (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                              rounded absolute whitespace-nowrap'
          >
            {error}
          </div>
        ) : (
          <ErrorMessage
            name={'contacts.' + contactName}
            component='div'
            className='bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                              rounded absolute whitespace-nowrap'
          />
        )}
      </span>
    </div>
  )
}

export default InputContact

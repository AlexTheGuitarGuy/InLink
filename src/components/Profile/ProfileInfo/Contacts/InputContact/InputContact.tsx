import { FC } from 'react'
import { ContactProps } from '../Contacts'
import FormInput from '../../../../common/Inputs/FormInput/FormInput'

const InputContact: FC<ContactProps> = ({ contactName, error }) => {
  return (
    <div className='mt-3'>
      <FormInput
        field={{
          name: `contacts.${contactName}`,
          placeholder: `insert ${contactName}`,
          className: 'p-1 w-full',
          id: contactName,
        }}
        label={{ text: contactName }}
        otherError={{ text: error }}
      />
    </div>
  )
}

export default InputContact

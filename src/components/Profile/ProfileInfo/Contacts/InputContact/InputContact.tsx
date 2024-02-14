import { FC } from 'react'

import FormInput from '../../../../common/Inputs/FormInput/FormInput'
import { ContactProps } from '../Contacts'

const InputContact: FC<ContactProps> = ({ contactName, error }) => {
  return (
    <FormInput
      field={{
        name: `contacts.${contactName}`,
        placeholder: `insert ${contactName}`,
      }}
      label={{ text: contactName, className: 'mb-1' }}
      otherError={{ text: error }}
    />
  )
}

export default InputContact

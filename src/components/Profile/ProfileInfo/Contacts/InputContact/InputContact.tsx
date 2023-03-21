import { FC } from 'react'

import { ContactProps } from '../Contacts'
import FormInput from '../../../../common/Inputs/FormInput/FormInput'

const InputContact: FC<ContactProps> = ({ contactName, error }) => {
  return (
    <FormInput
      field={{
        name: `contacts.${contactName}`,
        placeholder: `insert ${contactName}`,
      }}
      label={{ text: contactName }}
      otherError={{ text: error }}
    />
  )
}

export default InputContact

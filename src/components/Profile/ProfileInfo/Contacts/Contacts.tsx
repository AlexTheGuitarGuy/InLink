import { FC } from 'react'

import { ContactsObj } from '../../../../types/types'
import ContactIcon from './ContactIcon/ContactIcon'
import InputContact from './InputContact/InputContact'

type ContactsProps = {
  contacts: ContactsObj
  isEditMode: boolean
  status?: {
    error: ContactsObj
  }
}

export type ContactProps = {
  contactName: string
  contactAddress?: string
  error?: string
}

const Contacts: FC<ContactsProps> = ({ contacts, isEditMode, status }) => {
  let isEmpty = Object.values(contacts).every((element) => !element)

  const contactKeys = Object.keys(contacts) as Array<keyof ContactsObj>

  // I don't know what the API wants me to use these fields for.
  const excludedFields = ['mainLink', 'website']

  const parsedContacts = contactKeys
    .filter((element) => !excludedFields.includes(element))
    .map((key) => {
      let error: string = ''
      const asyncErrorKey = status?.error && Object.keys(status?.error)[0]
      const asyncErrorValue = status?.error && Object.values(status?.error)[0]

      if (asyncErrorKey && asyncErrorKey.includes('contacts') && asyncErrorKey.includes(key))
        error = asyncErrorValue!

      if (!contacts[key as keyof ContactsObj] && !isEditMode) return null

      return (
        <span key={key}>
          {isEditMode ? (
            <InputContact contactName={key} error={error} />
          ) : (
            contacts[key as keyof ContactsObj] && (
              <ContactIcon contactName={key} contactAddress={contacts[key as keyof ContactsObj]} />
            )
          )}
        </span>
      )
    })

  return (
    <div className='mt-2'>
      Contacts:
      {isEmpty && !isEditMode ? (
        <div>None</div>
      ) : (
        <div className='mt-3'>
          {isEditMode ? (
            <div className='space-y-2 flex flex-col'>{parsedContacts}</div>
          ) : (
            <div className='w-fit space-x-2'>{parsedContacts.filter((element) => !!element)}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Contacts

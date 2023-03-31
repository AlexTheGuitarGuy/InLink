import { FC } from 'react'

import { ContactsObj } from '../../../../types/types'
import { swapElements } from '../../../../utils/array-helpers'
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
  let isEmpty = true
  for (let contact in contacts) {
    if (contacts.hasOwnProperty(contact)) {
      if (contacts[contact as keyof ContactsObj]) {
        isEmpty = false
        break
      }
    }
  }

  const contactKeys = Object.keys(contacts)

  swapElements(contactKeys, contactKeys.indexOf('vk'), contactKeys.length - 3)
  swapElements(contactKeys, contactKeys.indexOf('website'), contactKeys.length - 2)
  swapElements(contactKeys, contactKeys.indexOf('mainLink'), contactKeys.length - 1)

  const parsedContacts = contactKeys.map((key: string) => {
    let error: string = ''
    const asyncErrorKey = status?.error && Object.keys(status?.error)[0]
    const asyncErrorValue = status?.error && Object.values(status?.error)[0]

    if (asyncErrorKey && asyncErrorKey.includes('contacts') && asyncErrorKey.includes(key))
      error = asyncErrorValue!

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
            <div className='w-fit'>
              <div>{parsedContacts.slice(0, parsedContacts.length - 2)}</div>
              <div>{parsedContacts.slice(parsedContacts.length - 2)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Contacts

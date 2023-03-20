import React, { FC } from 'react'

import { ContactsObj } from '../../../../types/types'
import { swapElements } from '../../../../utils/array-helpers'
import TextContact from './TextContact/TextContact'
import InputContact from './InputContact/InputContact'

type ContactsProps = {
  contacts: ContactsObj
  isEditing: boolean
  status: {
    error: ContactsObj
  }
}

export type ContactProps = {
  contactName: string
  contactAddress?: string
  error?: string
}

const Contacts: FC<ContactsProps> = ({ contacts, isEditing, status }) => {
  let isEmpty = true
  let i
  for (i in contacts) {
    if (contacts.hasOwnProperty(i)) {
      if (contacts[i as keyof ContactsObj]) {
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
      error = asyncErrorValue

    return (
      <span key={key}>
        {isEditing ? (
          <InputContact contactName={key} error={error} />
        ) : (
          contacts[key as keyof ContactsObj] && (
            <TextContact contactName={key} contactAddress={contacts[key as keyof ContactsObj]} />
          )
        )}
      </span>
    )
  })

  return (
    <div className='mt-2 text-gray-700 space-y-2'>
      Contacts:
      <div>
        {isEmpty && !isEditing ? 'None' : parsedContacts.slice(0, parsedContacts.length - 2)}
      </div>
      <div>{isEmpty && !isEditing ? 'None' : parsedContacts.slice(parsedContacts.length - 2)}</div>
    </div>
  )
}

export default Contacts

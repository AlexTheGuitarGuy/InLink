import React, { FC } from 'react'
import TextContact from './TextContact/TextContact'
import InputContact from './InputContact/InputContact'
import { ContactsObj } from '../../../../types/types'

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

  const parsedContacts = Object.keys(contacts).map((key: string) => {
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
    <div className='mt-2 text-gray-700'>
      Contacts:
      <div className='ml-1'>{isEmpty && !isEditing ? 'None' : parsedContacts}</div>
    </div>
  )
}

export default Contacts

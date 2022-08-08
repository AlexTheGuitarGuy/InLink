import React from 'react';
import TextContact from './TextContact/TextContact';
import InputContact from './InputContact/InputContact';

const Contacts = ({ contacts, isEditing }) => {
  let isEmpty = true;
  let i;
  for (i in contacts) {
    if (contacts.hasOwnProperty(i)) {
      if (contacts[i]) {
        isEmpty = false;
        break;
      }
    }
  }

  const parsedContacts = Object.keys(contacts).map((key) => {
    return (
      <span key={key}>
        {isEditing ? (
          <InputContact contactName={key} />
        ) : (
          contacts[key] && <TextContact contactName={key} contactAddress={contacts[key]} />
        )}
      </span>
    );
  });

  return (
    <div className="mt-2 text-gray-700">
      Contacts:
      <div className="ml-1">{isEmpty && !isEditing ? 'None' : parsedContacts}</div>
    </div>
  );
};

export default Contacts;

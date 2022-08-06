import React from 'react';

const Contacts = ({ contacts }) => {
  let isEmpty = true;
  let i;
  for (i in contacts)
    if (contacts.hasOwnProperty(i)) {
      if (contacts[i]) {
        isEmpty = false;
        break;
      }
    }

  const parsedContacts = Object.keys(contacts).map((key) => {
    return (
      <span key={key}>
        {contacts[key] && <TextContact contactName={key} contactAddress={contacts[key]} />}
      </span>
    );
  });

  return (
    <div className="mt-2 text-gray-700">
      Contacts:
      <div className="ml-1">{isEmpty ? 'None' : parsedContacts}</div>
    </div>
  );
};

const TextContact = ({ contactName, contactAddress }) => {
  return (
    <div className="mt-2">
      {contactName}: <span className="font-normal">{contactAddress}</span>
    </div>
  );
};

export default Contacts;

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
        {contacts[key] && (
          <TextContact
            contactName={key}
            contactAddress={contacts[key]}
          />
        )}
      </span>
    );
  });

  return (
    <span className={'mt-1 text-white'}>
      Contacts:
      <div className={'ml-1'}>
        {isEmpty ? 'None' : parsedContacts}
      </div>
    </span>
  );
};

const TextContact = ({ contactName, contactAddress }) => {
  return (
    <div>
      {contactName}: {contactAddress}
    </div>
  );
};

export default Contacts;

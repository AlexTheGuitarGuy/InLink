import React from 'react';
import {
  createField,
  Input,
} from '../../../../common/FormControls/FormControls';
import cn from 'classnames';

const Contacts = ({ contacts, errorLocation }) => {
  const parsedContacts = Object.keys(contacts).map((key) => {
    return (
      <span key={key}>
        <ContactField
          contactName={key}
          errorLocation={errorLocation}
        />
      </span>
    );
  });

  return (
    <span className={'mt-1 text-white'}>
      Contacts:
      <div className={'ml-1'}>{parsedContacts}</div>
    </span>
  );
};

const ContactField = ({ contactName, errorLocation }) => {
  return (
    <div className={'mt-1'}>
      {contactName}:
      <span
        className={cn('ml-1 text-black', {
          'border-2 border-rose-600':
            errorLocation ===
            `Contacts->${
              contactName.charAt(0).toUpperCase() +
              contactName.slice(1)
            }`,
        })}
      >
        {createField(
          'insert ' + contactName,
          'contacts.' + contactName,
          Input,
          null,
        )}
      </span>
    </div>
  );
};

export default Contacts;

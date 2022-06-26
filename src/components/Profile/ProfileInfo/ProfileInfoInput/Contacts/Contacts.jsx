import React from 'react';
import {
  createField,
  Input,
} from '../../../../common/FormControls/FormControls';

const Contacts = ({ contacts }) => {
  const parsedContacts = Object.keys(contacts).map((key) => {
    return (
      <span key={key}>
        <ContactField contactName={key} />
      </span>
    );
  });

  return (
    <div className="mt-2 text-gray-700">
      Contacts:
      <div className="ml-1">{parsedContacts}</div>
    </div>
  );
};

const ContactField = ({ contactName }) => {
  return (
    <div className="mt-1">
      {contactName}:
      <span className="ml-2 text-gray-700">
        {createField(
          'insert ' + contactName,
          'contacts.' + contactName,
          Input,
          null,
          null,
          { className: 'p-1 rounded w-60' },
        )}
      </span>
    </div>
  );
};

export default Contacts;

import { FC } from 'react';
import { ContactProps } from '../Contacts';

const TextContact: FC<ContactProps> = ({ contactName, contactAddress }) => {
  return (
    <div className="mt-3">
      {contactName}: <span className="font-normal">{contactAddress}</span>
    </div>
  );
};

export default TextContact;

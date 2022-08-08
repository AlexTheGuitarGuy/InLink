const TextContact = ({ contactName, contactAddress }) => {
  return (
    <div className="mt-3">
      {contactName}: <span className="font-normal">{contactAddress}</span>
    </div>
  );
};

export default TextContact;

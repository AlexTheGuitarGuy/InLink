import { createField, Input } from '../../../../../common/FormControls/FormControls';

const InputContact = ({ contactName }) => {
  return (
    <div className="mt-3">
      <label htmlFor={contactName}>{contactName}:</label>
      <span className="ml-2 text-gray-700">
        {createField('insert ' + contactName, 'contacts.' + contactName, Input, null, null, {
          className: `p-1 rounded w-full
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition`,
          id: contactName,
        })}
      </span>
    </div>
  );
};

export default InputContact;

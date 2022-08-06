import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Textarea } from '../../common/FormControls/FormControls';
import { sendMessage } from '../../../redux/dialogs-reducer';
import { useDispatch } from 'react-redux';

const SendForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row justify-center">
        {createField('Enter your message', 'send', Textarea, null, null, {
          className: `resize-none w-full rounded-lg p-2 
                border border-gray-300
                focus:outline-none focus:border-gray-500
                transition`,
        })}

        <div>
          <button
            className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600
          text-gray-100 text-center
          rounded-full ml-4 px-2 py-2 mt-2
          transition-colors cursor-pointer
          focus:outline-none focus:ring-0"
          >
            <img src={require('../../../assets/send.png')} alt="Send" className="w-8 h-8 mr-3" />
          </button>
        </div>
      </div>
    </form>
  );
};

const ReduxSendText = reduxForm({
  form: 'login',
})(SendForm);

const SendText = ({ id }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(sendMessage(id, e.send));
    e.send = '';
  };

  return <ReduxSendText onSubmit={handleSubmit} />;
};

export default SendText;

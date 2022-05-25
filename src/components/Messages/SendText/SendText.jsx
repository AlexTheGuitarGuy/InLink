import React from 'react';
import s from './SendText.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormControls/FormControls';

const SendForm = ({ handleSubmit }) => {
  return (
    <form className={s.sendText} onSubmit={handleSubmit}>
      <Field
        className={s.textArea}
        placeholder={'Enter your message'}
        component={Textarea}
        name={'send'}
      />

      <div>
        <button className={s.button}>Send</button>
      </div>
    </form>
  );
};

const ReduxSendText = reduxForm({
  form: 'login',
})(SendForm);

const SendText = ({ send, id }) => {
  const handleSubmit = (e) => {
    send(id, e.send);
    e.send = '';
  };

  return <ReduxSendText onSubmit={handleSubmit} />;
};

export default SendText;

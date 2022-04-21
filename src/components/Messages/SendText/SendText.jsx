import React from 'react';
import s from './SendText.module.css';
import { Field, reduxForm } from 'redux-form';

const SendForm = (props) => {
  return (
    <form className={s.sendText} onSubmit={props.handleSubmit}>
      <Field
        className={s.textArea}
        placeholder={'Enter your message'}
        component={'textarea'}
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

const SendText = (props) => {
  const handleSubmit = (e) => {
    props.send(props.id, e.send);
    e.send = '';
  };

  return <ReduxSendText {...props} onSubmit={handleSubmit} />;
};

export default SendText;

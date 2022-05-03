import React from 'react';
import s from './Publish.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../common/FormControls/FormControls';

const PublishForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        className={s.textarea}
        placeholder={'Type what you think...'}
        component={Textarea}
        name={'post'}
      />
      <div>
        <button className={s.button}>Publish</button>
      </div>
    </form>
  );
};

const ReduxPublish = reduxForm({
  form: 'login',
})(PublishForm);

const Publish = (props) => {
  const handleSubmit = (e) => {
    props.post(e.post);
    e.post = '';
  };

  return (
    <div className={s.all}>
      <div className={s.newPost}>New post</div>
      <ReduxPublish {...props} onSubmit={handleSubmit} />
    </div>
  );
};

export default Publish;

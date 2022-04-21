import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLen, required } from '../../utils/validators/validators';
import { Input } from '../common/FormControls/FormControls';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={'Login'}
          name={'login'}
          component={Input}
          validate={[required, props.maxLen]}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          name={'password'}
          component={Input}
          validate={[required, props.maxLen]}
        />
      </div>
      <div>
        <Field
          type={'checkbox'}
          component={'input'}
          name={'rememberMe'}
        />{' '}
        remember me
      </div>
      <div>
        <button> Log in </button>
      </div>
    </form>
  );
};

const ReduxLogin = reduxForm({
  form: 'login',
})(LoginForm);

const Login = () => {
  const maxLen15 = maxLen(15);
  return (
    <div>
      <h1>Login</h1>
      <ReduxLogin maxLen={maxLen15} />
    </div>
  );
};

export default Login;

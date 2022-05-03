import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLen, required } from '../../utils/validators/validators';
import { Input } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import s from './Login.module.css';
import { Navigate } from 'react-router-dom';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={'Email'}
          name={'email'}
          component={Input}
          validate={[required, props.maxLen]}
        />
      </div>
      <div>
        <Field
          placeholder={'Password'}
          name={'password'}
          type={'password'}
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
      {props.captcha ? (
        <div className={s.captcha}>
          <img src={props.captcha} alt={'captcha'} />
          <Field
            placeholder={'captcha'}
            name={'captcha'}
            component={Input}
            validate={[required, props.maxLen]}
          />{' '}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

const ReduxLogin = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  if (props.isLoggedIn) return <Navigate to={'/profile'} />;

  const maxLen40 = maxLen(40);

  const onSubmit = (payload) => {
    props.login(
      payload.email,
      payload.password,
      payload.rememberMe,
      payload.captcha,
    );
  };
  return (
    <div>
      <h1 className={s.loginText}>Login</h1>
      <ReduxLogin
        maxLen={maxLen40}
        onSubmit={onSubmit}
        captcha={props.captcha}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  captcha: state.auth.captchaURL,
});

export default connect(mapStateToProps, { login })(Login);

import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLen, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/FormControls';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { getCaptchaURL, getIsLoggedIn } from '../../redux/auth-selector';
import { setAlert } from '../../redux/app-reducer';

let LoginForm = ({ handleSubmit, maxLen, captcha }) => {
  return (
    <section className="h-screen relative">
      <div className="px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-700">
          <div className="sm:w-8/12 lg:w-6/12 mb-12 sm:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone"
            />
          </div>
          <div className="sm:w-8/12 lg:w-5/12 lg:ml-20">
            <div className="text-gray-700 font-bold text-center mb-6">Log into InLink</div>
            <form onSubmit={handleSubmit} className="text-xl">
              <div className="mb-6">
                {createField('Email address', 'email', Input, [required, maxLen], null, {
                  className: `form-control block w-full
                    px-4 py-2 m-0
                    font-normal text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded
                    transition ease-in-out
                    focus:text-gray-800
                    focus:bg-white focus:border-gray-600
                    focus:outline-none`,
                })}
              </div>

              <div className="mb-6">
                {createField('Password', 'password', Input, [required, maxLen], 'password', {
                  className: `form-control block w-full
                    px-4 py-2  m-0
                    font-normal text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded
                    transition ease-in-out
                    focus:text-gray-800 focus:bg-white focus:border-gray-600
                    focus:outline-none`,
                })}
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  {createField('RememberMe', 'rememberMe', Input, null, 'checkbox', {
                    className: `h-4 w-4 mr-2
                      border border-gray-300
                      rounded-sm
                      focus:outline-none cursor-pointer`,
                    id: `exampleCheck`,
                  })}
                  <label
                    className="form-check-label inline-block text-gray-800 cursor-pointer"
                    htmlFor="exampleCheck"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="inline-block
                px-7 py-3
                bg-blue-600
                text-white font-medium text-sm leading-snug uppercase
                rounded shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg
                focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>

              <div className="text-gray-700 mt-6">
                Free account for visitors:
                <div>Email: free@samuraijs.com</div> <div>Password: free</div>
              </div>

              {captcha && (
                <div className="flex justify-center">
                  <div className="mt-6 text-gray-700">
                    <img src={captcha} alt="captcha" className="mb-4 w-full" />
                    {createField('Captcha', 'captcha', Input, [required, maxLen], null, {
                      className: `form-control block w-full
                    px-4 py-2 m-0
                    font-normal text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded
                    transition ease-in-out
                    focus:text-gray-800
                    focus:bg-white focus:border-gray-600
                    focus:outline-none`,
                    })}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const captcha = useSelector(getCaptchaURL);
  const dispatch = useDispatch();

  if (isLoggedIn) return <Navigate to={'/profile'} />;

  const maxLen40 = maxLen(40);

  const onSubmit = (payload) => {
    dispatch(login(payload)).then((message) => {
      dispatch(setAlert({ message, type: 'success' }));
    });
  };

  return <LoginForm maxLen={maxLen40} onSubmit={onSubmit} captcha={captcha} />;
};

export default Login;

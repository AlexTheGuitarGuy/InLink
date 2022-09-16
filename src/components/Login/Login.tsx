import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';

import { login } from '../../redux/auth-reducer/auth-reducer';
import { getCaptchaURL, getIsLoggedIn } from '../../redux/auth-reducer/auth-selector';
import { appActions } from '../../redux/app-reducer/app-reducer';

import { LoginPayload } from '../../types/types';

const Login: FC<{}> = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const captchaURL = useSelector(getCaptchaURL);
  const dispatch = useDispatch();

  if (isLoggedIn) return <Navigate to={'/profile'} />;

  const initialValues: LoginPayload = { email: '', password: '', rememberMe: false, captcha: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required(),
    password: Yup.string().required().min(6, 'Password is too short - should be 6 chars minimum'),
    rememberMe: Yup.boolean().default(false),
    captcha: Yup.string().when('!captcha && captchaURL', {
      is: true,
      then: Yup.string().required('captcha is required'),
    }),
  });

  const onSubmit = (values: LoginPayload, { setSubmitting }: FormikHelpers<LoginPayload>) => {
    dispatch(login(values) as unknown as Promise<string>).then((message: string) => {
      dispatch(appActions.setAlert({ message, type: 'success' }));
    });
    setSubmitting(false);
  };

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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ isSubmitting, values: { rememberMe } }: FormikProps<LoginPayload>) => (
                <Form className="text-xl">
                  <>
                    {status && console.log(status)}

                    <div className="mb-6">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="block w-full
                            px-4 py-2 m-0
                            font-normal text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300 rounded
                            transition ease-in-out
                            focus:text-gray-800
                            focus:bg-white focus:border-gray-600
                            focus:outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                      rounded absolute whitespace-nowrap"
                      />
                    </div>

                    <div className="mb-6">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block w-full
                        px-4 py-2  m-0
                        font-normal text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300 rounded
                        transition ease-in-out
                        focus:text-gray-800 focus:bg-white focus:border-gray-600
                        focus:outline-none"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                      rounded absolute whitespace-nowrap"
                      />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="h-4 w-4 mr-2
                          border border-gray-300
                          rounded-sm
                          focus:outline-none cursor-pointer"
                        />
                        <label
                          className="inline-block text-gray-800 cursor-pointer"
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
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>

                    <div className="text-gray-700 mt-6">
                      Free account for visitors:
                      <div>Email: free@samuraijs.com</div> <div>Password: free</div>
                    </div>

                    {captchaURL && (
                      <div className="flex justify-center">
                        <div className="mt-6 text-gray-700">
                          <img src={captchaURL} alt="captcha" className="mb-4 w-full" />
                          <Field
                            type="text"
                            name="captcha"
                            placeholder="Captcha"
                            className="block w-full
                                      px-4 py-2 m-0
                                      font-normal text-gray-700
                                      bg-white bg-clip-padding
                                      border border-solid border-gray-300 rounded
                                      transition ease-in-out
                                      focus:text-gray-800
                                      focus:bg-white focus:border-gray-600
                                      focus:outline-none"
                          />
                          <ErrorMessage
                            name="captcha"
                            component="div"
                            className="bg-red-100 border border-red-400 text-red-700 px-2 ml-2 
                            rounded absolute whitespace-nowrap"
                          />
                        </div>
                      </div>
                    )}
                  </>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

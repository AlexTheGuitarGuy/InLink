import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { login } from '@/redux/auth-reducer/auth-reducer'
import { getCaptchaURL, getIsLoggedIn } from '@/redux/auth-reducer/auth-selector'

import { LoginPayload } from '@/types'
import PrimaryButton from '@/components/common/Buttons/PrimaryButton/PrimaryButton'
import FormInput from '@/components/common/Inputs/FormInput/FormInput'

const Login: FC = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const captchaURL = useAppSelector(getCaptchaURL)

  const dispatch = useAppDispatch()

  if (isLoggedIn) return <Navigate to={'/profile'} />

  const initialValues: LoginPayload = { email: '', password: '', rememberMe: false, captcha: '' }

  const passwordMinLength = 4
  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required(),
    password: Yup.string()
      .required()
      .min(
        passwordMinLength,
        `Password is too short - should be ${passwordMinLength} chars minimum`,
      ),
    rememberMe: Yup.boolean().default(false),
    captcha: Yup.string().when('!captcha && captchaURL', {
      is: true,
      then: Yup.string().required('captcha is required'),
    }),
  })

  const onSubmit = (values: LoginPayload, { setSubmitting }: FormikHelpers<LoginPayload>) => {
    dispatch(login(values))
    setSubmitting(false)
  }

  return (
    <section className='relative'>
      <div className='px-6 py-12 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full'>
          <div className='sm:w-8/12 lg:w-6/12 mb-12 sm:mb-0'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
              className='w-full'
              alt='Phone'
            />
          </div>
          <div className='sm:w-8/12 lg:w-5/12 lg:ml-20'>
            <div className='font-bold text-center mb-6'>Log into InLink</div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ isSubmitting, isValid }: FormikProps<LoginPayload>) => (
                <Form className='text-xl'>
                  <>
                    <div className='mb-6'>
                      <FormInput
                        error={{ iserror: !isValid }}
                        field={{
                          type: 'email',
                          name: 'email',
                          placeholder: 'Email address',
                          className: 'w-full px-4 py-2',
                        }}
                      />
                    </div>

                    <div className='mb-6'>
                      <FormInput
                        error={{ iserror: !isValid }}
                        field={{
                          type: 'password',
                          name: 'password',
                          placeholder: 'Password',
                          className: 'w-full px-4 py-2',
                        }}
                      />
                    </div>

                    <div className='flex justify-between items-center mb-6'>
                      <div>
                        <Field
                          type='checkbox'
                          name='rememberMe'
                          id='rememberMe'
                          className='h-4 w-4 mr-2
                          border border-onNeutralBg
                          rounded-sm
                          focus:outline-none cursor-pointer'
                        />
                        <label className='inline-block cursor-pointer' htmlFor='rememberMe'>
                          Remember me
                        </label>
                      </div>
                    </div>

                    <PrimaryButton
                      type='submit'
                      className='inline-block
                                px-7 py-3 w-full text-sm'
                      disabled={isSubmitting}
                    >
                      Log in
                    </PrimaryButton>

                    <div className='mt-6'>
                      Free account for visitors:
                      <div>Email: free@samuraijs.com</div> <div>Password: free</div>
                    </div>

                    {captchaURL && (
                      <div className='flex justify-center'>
                        <div className='mt-6'>
                          <img src={captchaURL} alt='captcha' className='mb-4 w-full' />

                          <FormInput
                            error={{ iserror: !isValid }}
                            field={{
                              type: 'text',
                              name: 'captcha',
                              placeholder: 'Captcha',
                              className: 'w-full px-4 py-2',
                            }}
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
  )
}

export default Login

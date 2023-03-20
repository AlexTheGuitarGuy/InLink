import { ChangeEvent, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { debounce } from 'lodash'

import FormInput from '../../common/Inputs/FormInput/FormInput'

type SearchFormValues = {
  usersType: string
  search: string
}

const UsersSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const formRef = useRef<FormikProps<SearchFormValues>>(null)

  const initialValues = {
    usersType: 'all',
    search: searchParams.get('term') || '',
  }

  const maxSearchLen = 50
  const validationSchema = Yup.object({
    search: Yup.string()
      .trim()
      .max(maxSearchLen, `Search term too long. Maximum is ${maxSearchLen} characters.`),
  })

  const onSubmit = (
    { search, usersType }: SearchFormValues,
    { setSubmitting }: FormikHelpers<SearchFormValues>,
  ) => {
    let newURL = `?page=1&count=${searchParams.get('count')}`

    if (search.trim()) newURL += `&term=${search}`

    if (usersType !== 'all') newURL += `&friend=${usersType === 'friends'}`

    setSearchParams(newURL)

    setSubmitting(false)
  }

  const debouncedSearch = useRef(
    debounce(() => {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    }, 1000),
  ).current
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ isValid, handleChange }: FormikProps<SearchFormValues>) => (
        <Form className='flex justify-end lg:mr-60 lg:mb-2 lg:my-0 my-6 lg:mx-0 mx-20'>
          <div className='lg:w-auto w-full'>
            <FormInput
              error={{ isError: !isValid }}
              field={{
                name: 'search',
                className: 'py-1 px-3 lg:w-auto w-full',
                restprops: {
                  onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                    debouncedSearch()
                  },
                },
              }}
              label={{ text: 'search for users', className: 'block' }}
            />
            <div className='mt-1'>
              <Field
                name='usersType'
                as='select'
                className='bg-gray-100
                            border border-gray-300
                            text-gray-900
                            text-sm
                            rounded
                            focus:ring-blue-500 focus:border-blue-500
                            p-2.5 w-full
                            transition
                            focus:outline-none'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange(event)
                  debouncedSearch()
                }}
              >
                <option value='all'>All</option>
                <option value='friends'>Friends</option>
                <option value='non-friends'>Non-Friends</option>
              </Field>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default UsersSearch

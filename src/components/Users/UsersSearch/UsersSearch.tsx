import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import FormInput from '../../common/Inputs/FormInput/FormInput'
import * as Yup from 'yup'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import { useSearchParams } from 'react-router-dom'

type SearchFormValues = {
	usersType: string
	search: string
}

const UsersSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const initialValues = {
		usersType: 'all',
		search: '',
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
		let newURL = `?page=${searchParams.get('page')}&count=${searchParams.get('count')}`

		if (search.trim()) newURL += `&term=${search}`

		if (usersType !== 'all') newURL += `&friend=${usersType === 'friends' ? true : false}`

		setSearchParams(newURL)

		setSubmitting(false)
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{({ isSubmitting, isValid }: FormikProps<SearchFormValues>) => (
				<Form className='flex justify-end lg:mr-60 lg:mb-2 lg:my-0 my-6 lg:mx-0 mx-20'>
					<div className='lg:w-auto w-full'>
						<FormInput
							field={{ name: 'search', className: 'py-1 px-3 lg:w-auto w-full' }}
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
							>
								<option value='all'>All</option>
								<option value='friends'>Friends</option>
								<option value='non-friends'>Non-Friends</option>
							</Field>
						</div>
						<div className='flex justify-end'>
							<PrimaryButton type='submit' className='px-3 py-0.5 mt-2'>
								submit
							</PrimaryButton>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default UsersSearch

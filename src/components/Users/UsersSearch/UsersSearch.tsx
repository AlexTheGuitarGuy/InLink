import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import FormInput from '../../common/Inputs/FormInput/FormInput'
import * as Yup from 'yup'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'

type SearchFormValues = {
	search: string
}

const UsersSearch = () => {
	const initialValues = {
		search: '',
	}

	const maxSearchLen = 50
	const validationSchema = Yup.object({
		search: Yup.string()
			.trim()
			.max(maxSearchLen, `Search term too long. Maximum is ${maxSearchLen} characters.`),
	})

	const onSubmit = (
		{ search }: SearchFormValues,
		{ setSubmitting }: FormikHelpers<SearchFormValues>,
	) => {
		if (search.trim()) {
			alert(search)
		}
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

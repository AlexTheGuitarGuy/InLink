import { ErrorMessage, Field } from 'formik'
import { FC } from 'react'
import cn from 'classnames'

type FormInputProps = {
	field: {
		type?: string
		name: string
		placeholder: string
		as?: string
		className?: string
		id?: string
	}
	error?: {
		className?: string
	}
	otherError?: { text?: string; className?: string }
	label?: {
		text: string
		className?: string
	}
}

const FormInput: FC<FormInputProps> = ({
	field: { type = 'text', ...field },
	error,
	otherError,
	label,
}) => {
	return (
		<>
			{label && (
				<label htmlFor={field.name} className={label.className}>
					{label.text}
				</label>
			)}
			<Field
				{...field}
				type={type}
				className={cn(
					`rounded 
                    border border-gray-300 border-solid
                    focus:outline-none focus:border-gray-600
                    focus:text-gray-800
                    transition ease-in-out
                    bg-clip-padding`,
					field.className,
				)}
			/>
			{otherError?.text ? (
				<div
					className={cn(
						`bg-red-100 border border-red-400 text-red-700 
									rounded absolute whitespace-nowrap px-2 ml-2`,
						otherError.className,
					)}
				>
					{otherError.text}
				</div>
			) : (
				<ErrorMessage
					name={field.name}
					{...error}
					component='div'
					className={cn(
						`bg-red-100 border border-red-400 text-red-700
	                  rounded absolute whitespace-nowrap px-2 ml-2`,
						error?.className,
					)}
				/>
			)}
		</>
	)
}
export default FormInput

import { FC } from 'react'
import cn from 'classnames'

type RegularInputProps = {
	field: {
		type?: string
		name?: string
		placeholder: string
		className?: string
	}
	label?: {
		text: string
		className?: string
	}
	as: 'input' | 'textarea'
	restProps: any
}

const RegularInput: FC<RegularInputProps> = ({
	field: { type = 'text', ...field },
	label,
	as,
	restProps,
}) => {
	return (
		<>
			{label && (
				<label htmlFor={label.text} className={label.className}>
					{label.text}
				</label>
			)}
			{as === 'input' && (
				<input
					{...field}
					type={type}
					{...restProps}
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
			)}
			{as === 'textarea' && (
				<textarea
					{...field}
					className={cn(
						`rounded 
                    border border-gray-300
                    focus:outline-none focus:border-gray-500
                    transition`,
						field.className,
					)}
				/>
			)}
		</>
	)
}
export default RegularInput

import { FC, MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

type PrimaryButtonProps = {
	color?: string
	children: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	as?: 'button' | 'navlink'
	to?: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
	color = 'gray',
	onClick,
	children,
	className,
	type = 'button',
	disabled,
	as = 'button',
	to,
}) => {
	let regularBackground = ''
	let disabledBackground = ''
	switch (color) {
		case 'gray': {
			regularBackground = `bg-gray-500 hover:bg-gray-600 
		                    	focus:bg-gray-600 active:bg-gray-700`
			disabledBackground = `bg-gray-300`
			break
		}
		case 'lightGray': {
			regularBackground = `bg-gray-300 hover:bg-gray-400 
		                    	focus:bg-gray-400 active:bg-gray-500`
			disabledBackground = `bg-gray-100`
			break
		}
		case 'background': {
			regularBackground = `bg-gray-100 hover:bg-gray-200 
		                    	focus:bg-gray-200 active:bg-gray-300`
			disabledBackground = `bg-gray-300`
			break
		}
		case 'blue': {
			regularBackground = `bg-blue-600 hover:bg-blue-700 
		                    	focus:bg-blue-700 active:bg-blue-800`
			disabledBackground = `bg-blue-300`
			break
		}
		case 'rose': {
			regularBackground = `bg-rose-600 hover:bg-rose-700 
		                    	focus:bg-rose-700 active:bg-rose-800`
			disabledBackground = `bg-rose-300`
			break
		}
	}

	return (
		<>
			{as === 'button' && (
				<button
					className={cn(
						`text-white font-semibold
	                    rounded

	                    shadow-md 
	                    focus:outline-none focus:ring-0
	                    transition duration-150 ease-in-out`,
						{
							'active:shadow-lg focus:shadow-lg hover:shadow-lg': !disabled,
						},
						{
							[regularBackground]: !disabled,
						},
						{
							'cursor-not-allowed': disabled,
						},
						{
							[disabledBackground]: disabled,
						},
						className,
					)}
					onClick={onClick}
					type={type}
					disabled={disabled}
				>
					{children}
				</button>
			)}
			{as === 'navlink' && to && (
				<NavLink
					className={cn(
						`text-white font-semibold
	                    rounded

	                    shadow-md 
	                    focus:outline-none focus:ring-0
	                    transition duration-150 ease-in-out`,
						{
							'active:shadow-lg focus:shadow-lg hover:shadow-lg': !disabled,
						},
						{
							[regularBackground]: !disabled,
						},
						{
							'cursor-not-allowed': disabled,
						},
						{
							[disabledBackground]: disabled,
						},
						className,
					)}
					to={to}
				>
					{children}
				</NavLink>
			)}
		</>
	)
}

export default PrimaryButton

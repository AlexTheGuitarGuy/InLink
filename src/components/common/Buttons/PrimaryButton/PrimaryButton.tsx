import { FC, MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

export enum ButtonColor {
  neutral = 'neutral',
  transparent = 'transparent',
  primary = 'primary',
  rose = 'rose',
}

type PrimaryButtonProps = {
  color?: ButtonColor
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  as?: 'button' | 'navlink'
  to?: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  color = ButtonColor.primary,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
  as = 'button',
  to,
}) => {
  let regularBackground = ''
  switch (color) {
    case ButtonColor.neutral: {
      regularBackground = `bg-neutralBg ring-neutralFocus`
      break
    }
    case ButtonColor.transparent: {
      regularBackground = `backdrop-blur ring-neutralBg`
      break
    }
    case ButtonColor.primary: {
      regularBackground = `bg-primaryChild ring-primaryFocus`
      break
    }
    case ButtonColor.rose: {
      regularBackground = `bg-rose-600 ring-rose-400`
      break
    }
  }

  return (
    <>
      {as === 'button' && (
        <button
          className={cn(
            `font-semibold
	                    rounded
	                    active:ring-1
	                    shadow-md 
	                    focus:outline-none focus:ring-0
                        duration-150 ease-in-out transition-all`,
            {
              'hover:shadow-xl active:shadow-none ease-in-out': !disabled,
              [regularBackground]: regularBackground,
              'cursor-not-allowed opacity-70': disabled,
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
            `font-semibold
	                    rounded
	                    active:ring-1
	                    shadow-md 
	                    focus:outline-none focus:ring-0
                        duration-150 ease-in-out transition-all`,
            {
              'hover:shadow-xl active:shadow-none ease-in-out': !disabled,
              [regularBackground]: regularBackground,
              'cursor-not-allowed opacity-70': disabled,
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

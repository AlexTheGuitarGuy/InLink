import cn from 'classnames'
import { FC } from 'react'
import { Alert as AlertType } from '../../types/types'

type AlertProps = {
  alert: AlertType
  isShown: boolean
}

const Alert: FC<AlertProps> = ({ alert, isShown }) => {
  const { type, message } = alert

  let alertTitle
  switch (type) {
    case 'error':
      alertTitle = 'An error has occurred:'
      break
    case 'success':
      alertTitle = 'Operation successful:'
      break
    case 'alert':
      alertTitle = 'Message:'
  }

  return (
    <div className='w-full fixed z-50 flex justify-end lg:right-4'>
      <div
        className={cn(
          `lg:w-1/3 sm:w-full px-4 py-3 
          rounded
          transition-opacity
          absolute`,
          { 'bg-rose-100 border border-rose-400 text-rose-700': type === 'error' },
          { 'bg-primaryBg border border-onPrimaryBg': type === 'success' },
          { 'bg-yellow-100 border border-yellow-400 text-yellow-700': type === 'alert' },
          { 'opacity-100': isShown },
          { 'opacity-0 pointer-events-none': !isShown },
        )}
        role='alert'
      >
        <strong className='font-bold'>{alertTitle}</strong>
        <span className='ml-2 block sm:inline'>{message}</span>
      </div>
    </div>
  )
}

export default Alert

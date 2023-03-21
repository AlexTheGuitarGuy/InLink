import { FC, ReactNode, RefObject } from 'react'
import cn from 'classnames'
import { Close } from '@mui/icons-material'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import useTagBlur from '../../../../hooks/useTagBlur'

export type BaseDialogProps = {
  isShown: boolean
  onClose: () => void
  onSubmit?: () => void
  name?: string
  children?: ReactNode
  showFooter?: boolean
}
const BaseDialog: FC<BaseDialogProps> = ({
  onClose,
  onSubmit,
  name = 'Dialog',
  children,
  showFooter,
  isShown,
}: BaseDialogProps) => {
  const handleClose = () => {
    onClose()
  }
  const handleSubmit = () => {
    if (onSubmit) onSubmit()
  }

  const ref = useTagBlur(isShown, handleClose)

  return (
    <div
      className={cn(
        'fixed z-50 left-0 top-0 w-full h-full bg-black/30 transition-opacity duration-100 text-gray-800',
        {
          'opacity-100': isShown,
          'opacity-0 pointer-events-none': !isShown,
        },
      )}
    >
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    bg-white shadow-md rounded
                    flex flex-col divide-y border-gray-500'
      >
        <header className='flex justify-between px-6 py-3'>
          <h5 className='font-semibold text-xl'>{name}</h5>
          <button
            onClick={handleClose}
            className='hover:bg-gray-200 transition-colors duration-75 ease-in-out rounded p-0.5'
          >
            <Close className='-mt-1' />
          </button>
        </header>
        <main>{children}</main>
        {showFooter && (
          <footer className='flex justify-end px-6 py-3'>
            <div className='flex space-x-4'>
              <PrimaryButton onClick={handleClose} className='px-5 py-2' color='rose'>
                Cancel
              </PrimaryButton>
              <PrimaryButton onClick={handleSubmit} className='px-5 py-2' color='blue'>
                Done
              </PrimaryButton>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

export default BaseDialog
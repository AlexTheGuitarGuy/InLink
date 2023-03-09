import { FC, ReactNode } from 'react'

export type MenuItemProps = {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  setMenuOpen?: (value: boolean) => void
}

const MenuItem: FC<MenuItemProps> = ({ children, icon, onClick, setMenuOpen }) => {
  let ItemClicked = () => {
    if (onClick) onClick()
    if (setMenuOpen) setMenuOpen(false)
  }
  return (
    <button
      onClick={ItemClicked}
      className='bg-white hover:bg-gray-200
                active:bg-gray-300 active:transition-colors active:ease-in-out
                w-full flex items-center space-x-2 px-2 py-1 text-lg'
    >
      <div className='flex justify-center'>{icon}</div>
      <div className='flex justify-center'>{children}</div>
    </button>
  )
}

export default MenuItem

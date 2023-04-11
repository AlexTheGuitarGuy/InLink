import { FC, ReactNode } from 'react'

export type MenuItemProps = {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  setMenuOpen?: (value: boolean) => void
}

const DropdownItem: FC<MenuItemProps> = ({ children, icon, onClick, setMenuOpen }) => {
  let ItemClicked = () => {
    if (onClick) onClick()
    if (setMenuOpen) setMenuOpen(false)
  }
  return (
    <button
      onClick={ItemClicked}
      className='active:bg-neutralChild hover:bg-neutralChild bg-neutralBg active:transition-colors active:ease-in-out
                w-full flex items-center space-x-2 px-2 py-1 text-lg'
    >
      <div className='flex justify-center'>{icon}</div>
      <div className='flex justify-center'>{children}</div>
    </button>
  )
}

export default DropdownItem

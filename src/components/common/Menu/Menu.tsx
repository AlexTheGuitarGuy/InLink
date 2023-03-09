import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { v1 as uuidv1 } from 'uuid'

export type MenuProps = {
  open: boolean
  children: ReactNode[]
  absolutePosition?: string
}

const Menu: FC<MenuProps> = ({ open, children, absolutePosition = 'right-0' }) => {
  return (
    <div
      className={cn(
        'absolute shadow-md flex flex-col bg-white py-1 -mt-2 rounded w-fit transition-all duration-75',
        {
          'opacity-0 pointer-events-none': !open,
        },
        {
          'opacity-100 translate-y-2': open,
        },
        absolutePosition,
      )}
    >
      {children.map((child) => (
        <div key={uuidv1()}>{child}</div>
      ))}
    </div>
  )
}

export default Menu

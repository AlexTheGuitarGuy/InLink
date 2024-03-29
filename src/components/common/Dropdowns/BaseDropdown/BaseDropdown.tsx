import cn from 'classnames'
import { FC, ReactNode } from 'react'
import { v1 as uuidv1 } from 'uuid'

export type BaseDropdownProps = {
  open: boolean
  children: ReactNode[]
  absolutePosition?: string
}

const BaseDropdown: FC<BaseDropdownProps> = ({ open, children, absolutePosition = 'right-0' }) => {
  return (
    <div
      role='list'
      className={cn(
        'z-40 absolute shadow-md flex flex-col bg-neutralBg py-1 -mt-2 rounded w-fit transition-all duration-75',
        {
          'opacity-0 pointer-events-none': !open,
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

export default BaseDropdown

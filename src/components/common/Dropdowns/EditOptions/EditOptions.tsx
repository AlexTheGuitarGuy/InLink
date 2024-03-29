import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { FC, RefObject, useState } from 'react'

import useTagBlur from '@/hooks/useTagBlur'
import BaseDropdown from '../BaseDropdown/BaseDropdown'
import DropdownItem from '../BaseDropdown/DropdownItem/DropdownItem'

export type EditOptionsProps = {
  onEdit: () => void
  onDelete: () => void
  absolutePosition?: string
  canEdit?: boolean
  onToggleMenu?: (open: boolean) => void
}

const EditOptions: FC<EditOptionsProps> = ({
  onEdit,
  onDelete,
  absolutePosition,
  canEdit = true,
  onToggleMenu,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOpenHandler = (open: boolean) => {
    setMenuOpen(open)
    if (onToggleMenu) onToggleMenu(open)
  }

  const menuRef = useTagBlur(menuOpen, menuOpenHandler)

  return (
    <div className='relative font-normal' ref={menuRef as RefObject<HTMLDivElement>}>
      <button
        onClick={() => menuOpenHandler(!menuOpen)}
        className='cursor-pointer hover:bg-neutralChild rounded'
        aria-label='More Options'
      >
        <MoreVert />
      </button>
      <BaseDropdown open={menuOpen} absolutePosition={absolutePosition}>
        {canEdit && (
          <DropdownItem icon={<Edit />} onClick={onEdit} setMenuOpen={menuOpenHandler}>
            Edit
          </DropdownItem>
        )}
        <DropdownItem icon={<Delete />} onClick={onDelete} setMenuOpen={menuOpenHandler}>
          Delete
        </DropdownItem>
      </BaseDropdown>
    </div>
  )
}

export default EditOptions

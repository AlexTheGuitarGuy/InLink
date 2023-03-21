import React, { FC, RefObject, useState } from 'react'
import { Delete, Edit, MoreVert } from '@mui/icons-material'

import Dropdown from '../Dropdown'
import DropdownItem from '../DropdownItem/DropdownItem'
import useTagBlur from '../../../../hooks/useTagBlur'

export type EditOptionsProps = {
  onEdit: () => void
  onDelete: () => void
  absolutePosition?: string
  canEdit?: boolean
}

const EditOptions: FC<EditOptionsProps> = ({
  onEdit,
  onDelete,
  absolutePosition,
  canEdit = true,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useTagBlur(menuOpen, setMenuOpen)

  return (
    <div className='relative font-normal' ref={menuRef as RefObject<HTMLDivElement>}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className='cursor-pointer hover:bg-gray-200 active:bg-gray-300 rounded'
      >
        <MoreVert />
      </button>
      <Dropdown open={menuOpen} absolutePosition={absolutePosition}>
        {canEdit && (
          <DropdownItem icon={<Edit />} onClick={onEdit} setMenuOpen={setMenuOpen}>
            Edit
          </DropdownItem>
        )}
        <DropdownItem icon={<Delete />} onClick={onDelete} setMenuOpen={setMenuOpen}>
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

export default EditOptions

import React, { FC, RefObject, useState } from 'react'
import { Delete, Edit, MoreVert } from '@mui/icons-material'

import Menu from '../Menu'
import MenuItem from '../MenuItem/MenuItem'
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
      <Menu open={menuOpen} absolutePosition={absolutePosition}>
        {canEdit && (
          <MenuItem icon={<Edit />} onClick={onEdit} setMenuOpen={setMenuOpen}>
            Edit
          </MenuItem>
        )}
        <MenuItem icon={<Delete />} onClick={onDelete} setMenuOpen={setMenuOpen}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}

export default EditOptions

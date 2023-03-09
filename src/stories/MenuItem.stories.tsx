import { ComponentMeta } from '@storybook/react'
import { Edit } from '@mui/icons-material'

import MenuItem, { MenuItemProps } from '../components/common/Menu/MenuItem/MenuItem'

export default {
  title: 'MenuItem',
  component: MenuItem,
  argTypes: {
    icon: {
      control: {
        type: 'boolean',
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof MenuItem>

export const Default = ({ children, icon, ...rest }: MenuItemProps) => (
  <MenuItem icon={icon && <Edit />} {...rest}>
    {children || 'test'}
  </MenuItem>
)

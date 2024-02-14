import { Facebook, GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { FC } from 'react'

import VkIcon from 'components/common/Icons/VkIcon/VkIcon'
import { ContactProps } from '../Contacts'

const ContactIcon: FC<ContactProps> = ({ contactName, contactAddress }) => {
  const iconsMap = {
    facebook: <Facebook fontSize='large' />,
    github: <GitHub fontSize='large' />,
    instagram: <Instagram fontSize='large' />,
    twitter: <Twitter fontSize='large' />,
    vk: <VkIcon className='fill-neutralFocus mt-40' />,
    youtube: <YouTube fontSize='large' />,
  }

  return (
    <a
      href={contactAddress}
      className='hover:opacity-80 transition-opacity ease-in-out duration-75'
    >
      {iconsMap[contactName as keyof typeof iconsMap]}
    </a>
  )
}

export default ContactIcon

import { Facebook, GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { FC } from 'react'

import VkIcon from '../../../../common/Icons/VkIcon/VkIcon'
import { ContactProps } from '../Contacts'

const ContactIcon: FC<ContactProps> = ({ contactName, contactAddress }) => {
  const iconsMap = {
    facebook: <Facebook />,
    github: <GitHub />,
    instagram: <Instagram />,
    mainLink: (
      <div className='mx-0.5 mt-2 px-1 hover:bg-neutralChild transition-colors rounded'>
        main link
      </div>
    ),
    twitter: <Twitter />,
    vk: <VkIcon className='fill-neutralFocus mt-40' />,
    website: (
      <div className='mx-0.5 mt-2 px-1 hover:bg-neutralChild transition-colors rounded'>
        website
      </div>
    ),
    youtube: <YouTube />,
  }

  return <a href={contactAddress}>{iconsMap[contactName as keyof typeof iconsMap]}</a>
}

export default ContactIcon

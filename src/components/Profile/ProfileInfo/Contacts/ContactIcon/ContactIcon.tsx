import { FC } from 'react'
import { Facebook, GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'

import { ContactProps } from '../Contacts'
import VkIcon from '../../../../common/Icons/VkIcon/VkIcon'

const ContactIcon: FC<ContactProps> = ({ contactName, contactAddress }) => {
  const iconsMap = {
    facebook: <Facebook />,
    github: <GitHub />,
    instagram: <Instagram />,
    mainLink: (
      <div className='mx-0.5 mt-2 px-1 hover:bg-neutral-200 transition-colors rounded'>
        main link
      </div>
    ),
    twitter: <Twitter />,
    vk: <VkIcon className='fill-neutral-700 mt-40' />,
    website: (
      <div className='mx-0.5 mt-2 px-1 hover:bg-neutral-200 transition-colors rounded'>website</div>
    ),
    youtube: <YouTube />,
  }

  return (
    <button onClick={() => (window.location.href = contactAddress || window.location.href)}>
      {iconsMap[contactName as keyof typeof iconsMap]}
    </button>
  )
}

export default ContactIcon
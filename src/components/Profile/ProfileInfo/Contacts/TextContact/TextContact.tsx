import { FC } from 'react'
import { Facebook, GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'

import { ContactProps } from '../Contacts'
import VkIcon from '../../../../common/Icons/VkIcon/VkIcon'

const TextContact: FC<ContactProps> = ({ contactName, contactAddress }) => {
  const iconsMap = {
    facebook: <Facebook />,
    github: <GitHub />,
    instagram: <Instagram />,
    mainLink: (
      <button className='mx-0.5 px-1 hover:bg-gray-200 transition-colors rounded'>main link</button>
    ),
    twitter: <Twitter />,
    vk: <VkIcon className='fill-gray-700 mt-40' />,
    website: (
      <button className='mx-0.5 px-1 hover:bg-gray-200 transition-colors rounded'>website</button>
    ),
    youtube: <YouTube />,
  }

  return (
    <button onClick={() => (window.location.href = contactAddress || window.location.href)}>
      {iconsMap[contactName as keyof typeof iconsMap]}
    </button>
  )
}

export default TextContact

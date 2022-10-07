import React, { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router'
import { compose } from 'redux'
import { useSelector } from 'react-redux'

import { getUserMessages } from '../../redux/dialogs-reducer/dialogs-selector'
import { getFrontPageFriends } from '../../redux/users-reducer/users-selector'
import { getMyData } from '../../redux/profile-reducer/profile-selector'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import useScreenSize from '../../hooks/useScreenSize'

import { UserMessage as UserMessageType } from '../../types/types'

import UserMessage from './UserMessage/UserMessage'
import Users from './Users/Users'
import SendText from './SendText/SendText'
import Loading from '../common/Loading/Loading'

const Messages = () => {
  const userMessages = useSelector(getUserMessages)
  const users = useSelector(getFrontPageFriends)
  const myData = useSelector(getMyData)

  const screenSize = useScreenSize()

  if (!myData || !users) return <Loading />

  const conversationComponents = userMessages.map(
    (conversation: UserMessageType[], conversationIndex: number) => {
      return conversation.map((message: UserMessageType, messageIndex: number) => {
        return (
          <div key={messageIndex}>
            <UserMessage message={message} conversationIndex={conversationIndex} users={users} />
          </div>
        )
      })
    },
  )

  const routes = conversationComponents.map((conversationComponent: ReactNode[], index: number) => {
    return (
      <Route
        path={`/${index}`}
        key={index}
        element={
          <div className='flex flex-col h-full w-full relative'>
            <div className='lg:mx-16 mx-3 mb-14 overflow-y-scroll  h-screen'>
              {conversationComponents[index]}
            </div>
            <div
              className='fixed bottom-0 lg:w-3/5 sm:w-full self-center
              pb-4 rounded-t px-2 py-2 bg-gray-300'
            >
              <SendText id={index} />
            </div>
          </div>
        }
      />
    )
  })

  return (
    <div
      className='flex
         lg:bg-gray-100 lg:rounded-lg lg:p-8
         text-gray-700 lg:font-semibold
         xl:h-[92vh] lg:h-[88vh] h-screen w-full'
    >
      {screenSize.dynamicWidth >= 1366 && <Users users={users} />}

      <Routes>
        {screenSize.dynamicWidth < 1366 && <Route path='/all' element={<Users users={users} />} />}
        <Route path='/' element={<Navigate to={'0'} />} />
        {routes}
      </Routes>
    </div>
  )
}

export default compose(withAuthRedirect)(Messages)

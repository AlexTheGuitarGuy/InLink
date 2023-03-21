import React, { FC } from 'react'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import Loading, { Dimensions } from '../../Loading/Loading'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { getIsLoggedIn, getUID } from '../../../../redux/auth-reducer/auth-selector'
import { getFollowQueue } from '../../../../redux/users-reducer/users-selector'

type FollowButtonProps = {
  id: number
  followed: boolean
  onFollow: (id: number) => void
  onUnfollow: (id: number) => void
}
const FollowButton: FC<FollowButtonProps> = ({ id, followed, onFollow, onUnfollow }) => {
  const myUID = useAppSelector(getUID)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const followQueue = useAppSelector(getFollowQueue)

  const buttonText = followed ? 'Unfollow' : 'Follow'
  const buttonAction = followed ? (id: number) => onUnfollow(id) : (id: number) => onFollow(id)
  const isDisabled = followQueue.some((elem: number) => elem === id)

  return (
    <>
      {id !== myUID && isLoggedIn && (
        <PrimaryButton
          disabled={isDisabled}
          onClick={() => {
            buttonAction(id)
          }}
          className='sm:text-xs lg:text-md
                    lg:py-1 lg:px-4
                    sm:py-0.5 sm:px-2'
        >
          {(isDisabled && <Loading dimensions={Dimensions.small} />) || <>{buttonText}</>}
        </PrimaryButton>
      )}
    </>
  )
}

export default FollowButton

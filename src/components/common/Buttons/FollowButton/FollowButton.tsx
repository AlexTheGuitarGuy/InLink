import { FC } from 'react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getIsLoggedIn, getUID } from '@/redux/auth-reducer/auth-selector'
import Loading, { Dimensions } from '@/components/common/Loading/Loading'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

export type FollowButtonProps = {
  id: number
  followed: boolean
  onFollow: (id: number) => void
  onUnfollow: (id: number) => void
  checkIsDisabled: (id: number) => boolean
}
const FollowButton: FC<FollowButtonProps> = ({
  id,
  followed,
  onFollow,
  onUnfollow,
  checkIsDisabled,
}) => {
  const myUID = useAppSelector(getUID)
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const buttonText = followed ? 'Unfollow' : 'Follow'
  const buttonAction = followed ? (id: number) => onUnfollow(id) : (id: number) => onFollow(id)
  return (
    <>
      {id !== myUID && isLoggedIn && (
        <PrimaryButton
          disabled={checkIsDisabled(id)}
          onClick={() => {
            buttonAction(id)
          }}
          className='lg:py-0.5 lg:px-4
                          py-2 sm:px-6
                          mb-4 lg:mb-0'
        >
          {(checkIsDisabled(id) && <Loading dimensions={Dimensions.SMALL} />) || <>{buttonText}</>}
        </PrimaryButton>
      )}
    </>
  )
}

export default FollowButton

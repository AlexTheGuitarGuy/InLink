import { FC, useMemo } from 'react'
import cn from 'classnames'
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

  const isDisabled = useMemo(() => checkIsDisabled(id), [id, checkIsDisabled])

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
                          mb-4 lg:mb-0
                          relative'
        >
          <div
            className={cn('absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', {
              'opacity-0': !isDisabled,
            })}
          >
            <Loading dimensions={Dimensions.SMALL} />
          </div>
          <div className={cn({ 'opacity-0': isDisabled })}>{buttonText}</div>
        </PrimaryButton>
      )}
    </>
  )
}

export default FollowButton

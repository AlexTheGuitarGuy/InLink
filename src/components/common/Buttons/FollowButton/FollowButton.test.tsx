import { render } from '../../../../test-utils'
import FollowButton from './FollowButton'

jest.mock('../../../../hooks/reduxHooks.ts', () => ({
  useAppSelector: jest.fn(),
}))

describe('FollowButton component', () => {
  const onFollowMock = jest.fn()
  const onUnfollowMock = jest.fn()
  const checkIsDisabledMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )
  })

  /* it('renders button with "Follow" text when followed prop is false', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 2, getIsLoggedIn: true })
    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )
    const button = screen.getByRole('button', { name: /follow/i })
    expect(button).toBeInTheDocument()
  })

  it('renders button with "Unfollow" text when followed prop is true', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 2, getIsLoggedIn: true })
    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )

    const button = screen.getByRole('button', { name: /unfollow/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onFollow prop when button is clicked and followed prop is false', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 2, getIsLoggedIn: true })
    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )

    const button = screen.getByRole('button', { name: /follow/i })
    userEvent.click(button)

    expect(onFollowMock).toHaveBeenCalledTimes(1)
    expect(onFollowMock).toHaveBeenCalledWith(1)
  })

  it('calls onUnfollow prop when button is clicked and followed prop is true', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 2, getIsLoggedIn: true })
    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )

    const button = screen.getByRole('button', { name: /unfollow/i })
    userEvent.click(button)

    expect(onUnfollowMock).toHaveBeenCalledTimes(1)
    expect(onUnfollowMock).toHaveBeenCalledWith(1)
  })

  it('disables button when checkIsDisabled returns true', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 2, getIsLoggedIn: true })
    checkIsDisabledMock.mockReturnValue(true)

    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('does not render button when id prop is equal to myUID', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue({ getUID: 1, getIsLoggedIn: true })

    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
    )

    const button = screen.getByRole('button', { name: /follow/i })

    expect(button).not.toBeInTheDocument()
  }) */
})

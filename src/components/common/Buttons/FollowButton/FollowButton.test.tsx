import { authActions } from '../../../../redux/auth-reducer/auth-reducer'
import { setupStore } from '../../../../redux/store'
import { render, screen, userEvent } from '../../../../test-utils'
import FollowButton from './FollowButton'

describe('FollowButton component', () => {
  const onFollowMock = jest.fn()
  const onUnfollowMock = jest.fn()
  const checkIsDisabledMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders button with "Follow" text when followed prop is false', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 2 }))

    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      {
        store,
      },
    )
    const button = screen.getByRole('button', { name: /follow/i })
    expect(button).toBeInTheDocument()
  })

  it('renders button with "Unfollow" text when followed prop is true', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 2 }))

    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      {
        store,
      },
    )

    const button = screen.getByRole('button', { name: /unfollow/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onFollow prop when button is clicked and followed prop is false', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 2 }))

    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      { store },
    )

    const button = screen.getByRole('button', { name: /follow/i })
    userEvent.click(button)

    expect(onFollowMock).toHaveBeenCalledTimes(1)
    expect(onFollowMock).toHaveBeenCalledWith(1)
  })

  it('calls onUnfollow prop when button is clicked and followed prop is true', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 2 }))

    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      { store },
    )

    const button = screen.getByRole('button', { name: /unfollow/i })
    userEvent.click(button)

    expect(onUnfollowMock).toHaveBeenCalledTimes(1)
    expect(onUnfollowMock).toHaveBeenCalledWith(1)
  })

  it('disables button when checkIsDisabled returns true', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 2 }))

    checkIsDisabledMock.mockReturnValue(true)

    render(
      <FollowButton
        id={1}
        followed={false}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      { store },
    )

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('does not render button when id prop is equal to myUID', () => {
    const store = setupStore()
    store.dispatch(authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: true, id: 1 }))

    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      { store },
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('does not render button when is not logged in', () => {
    const store = setupStore()
    store.dispatch(
      authActions.setData({ login: 'test1', email: 'test2', isLoggedIn: false, id: 2 }),
    )

    render(
      <FollowButton
        id={1}
        followed={true}
        onFollow={onFollowMock}
        onUnfollow={onUnfollowMock}
        checkIsDisabled={checkIsDisabledMock}
      />,
      { store },
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

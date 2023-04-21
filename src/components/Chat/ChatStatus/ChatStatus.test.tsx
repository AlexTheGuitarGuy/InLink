import { Status } from '../../../api/chatAPI'
import { chatActions } from '../../../redux/chat-reducer/chat-reducer'
import { setupStore } from '../../../redux/store'
import { act, render, screen } from '../../../test-utils'
import ChatStatus from './ChatStatus'

describe('ChatStatus', () => {
  it('should show "Connected." when status is "ready"', () => {
    const store = setupStore()
    store.dispatch(chatActions.statusChanged(Status.READY))

    render(<ChatStatus />, {
      store,
    })

    expect(screen.getByText('Connected.')).toBeInTheDocument()
  })

  it('should show "Connecting..." when status is "pending"', () => {
    const store = setupStore()
    store.dispatch(chatActions.statusChanged(Status.PENDING))

    render(<ChatStatus />, {
      store,
    })

    expect(screen.getByText('Connecting...')).toBeInTheDocument()
  })

  it('should show "An error has occurred." when status is "error"', () => {
    const store = setupStore()
    store.dispatch(chatActions.statusChanged(Status.ERROR))

    render(<ChatStatus />, {
      store,
    })

    expect(screen.getByText('An error has occurred.')).toBeInTheDocument()
  })

  it('hides "Connected." after 5 seconds', () => {
    jest.useFakeTimers()
    const store = setupStore()
    store.dispatch(chatActions.statusChanged(Status.READY))

    render(<ChatStatus />, {
      store,
    })

    expect(screen.getByText('Connected.')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(screen.queryByText('Connected.')).not.toBeInTheDocument()
  })
})

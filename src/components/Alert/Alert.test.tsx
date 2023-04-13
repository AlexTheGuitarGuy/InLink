import { render, screen, within } from '../../test-utils'
import { Alert as AlertType } from '../../types/types'
import Alert from './Alert'

describe('Alert component', () => {
  const alert = {
    type: 'error',
    message: 'Something went wrong',
  } as AlertType

  test('renders alert with correct title and message', () => {
    render(<Alert alert={alert} isShown={true} />)
    const alertBox = screen.getByRole('alert')
    const { getByText } = within(alertBox)
    expect(getByText(/An error has occurred:/i)).toBeInTheDocument()
    expect(getByText(/Something went wrong/i)).toBeInTheDocument()
  })

  test('does not render alert when isShown is false', () => {
    render(<Alert alert={alert} isShown={false} />)
    const alertBox = screen.getByRole('alert')
    expect(alertBox).toHaveClass('opacity-0')
  })

  test('renders different styles for different alert types', () => {
    render(<Alert alert={{ type: 'success', message: 'Operation successful' }} isShown={true} />)
    const successAlertBox = screen.getByRole('alert')
    expect(successAlertBox).toHaveClass('bg-primaryBg')
  })
})

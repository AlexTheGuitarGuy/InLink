import { Alert as AlertType } from '../../types/types'

describe('Alert component', () => {
  const alert = {
    type: 'error',
    message: 'Something went wrong',
  } as AlertType

  // test('renders alert with correct title and message', () => {
  //   render(<Alert alert={alert} isShown={true} />)
  //   const alertBox = screen.getByRole('alert')
  //   const { getByText } = within(alertBox)
  //   expect(getByText(/An error has occurred:/i)).toBeInTheDocument()
  //   expect(getByText(/Something went wrong/i)).toBeInTheDocument()
  // })

  // test('does not render alert when isShown is false', () => {
  //   render(<Alert alert={alert} isShown={false} />)
  //   const alertBox = screen.queryByText(/An error has occurred/i)
  //   expect(alertBox).not.toBeInTheDocument()
  // })

  // test('renders different styles for different alert types', () => {
  //   render(<Alert alert={{ type: 'success', message: 'Operation successful' }} isShown={true} />)
  //   const successAlertBox = screen.getByRole('alert')
  //   expect(successAlertBox).toHaveClass('bg-primaryBg')
  // })

  // test('calls a function when the alert is dismissed', () => {
  //   const onClose = jest.fn()
  //   render(<Alert alert={alert} isShown={true} onClose={onClose} />)
  //   const closeButton = screen.getByRole('button', { name: /close/i })
  //   userEvent.click(closeButton)
  //   expect(onClose).toHaveBeenCalledTimes(1)
  // })
})

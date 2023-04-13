import { fireEvent, render, screen } from '../../../../test-utils'
import ConfirmDialog from './ConfirmDialog'

const mockOnSubmit = jest.fn()
const mockOnClose = jest.fn()

describe('ConfirmDialog', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component with the provided text', () => {
    render(
      <ConfirmDialog
        isShown={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        confirmText='Please confirm this action.'
      />,
    )

    expect(screen.getByText('Please confirm this action.')).toBeInTheDocument()
  })

  it('should call the onSubmit function when the "Yes" button is clicked', () => {
    render(
      <ConfirmDialog
        isShown={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        confirmText='Please confirm this action.'
      />,
    )
    const yesButton = screen.getByText('Yes')

    fireEvent.click(yesButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call the onClose function when the "No" button is clicked', () => {
    render(
      <ConfirmDialog
        isShown={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        confirmText='Please confirm this action.'
      />,
    )
    const noButton = screen.getByText('No')

    fireEvent.click(noButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})

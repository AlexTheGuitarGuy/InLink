import { fireEvent, render, screen } from '../../../../test-utils'
import EditOptions from './EditOptions'

describe('EditOptions', () => {
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  const defaultProps = {
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders the MoreVert button', () => {
    render(<EditOptions {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'More Options' })).toBeInTheDocument()
  })

  it('does not render the edit option when `canEdit` is false', () => {
    render(<EditOptions {...defaultProps} canEdit={false} />)
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
  })

  it('calls `onEdit` when the edit option is clicked', () => {
    render(<EditOptions {...defaultProps} />)
    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnEdit).toHaveBeenCalled()
  })

  it('calls `onDelete` when the delete option is clicked', () => {
    render(<EditOptions {...defaultProps} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockOnDelete).toHaveBeenCalled()
  })

  it('calls `onToggleMenu` when the menu is opened or closed', () => {
    const mockOnToggleMenu = jest.fn()
    render(<EditOptions {...defaultProps} onToggleMenu={mockOnToggleMenu} />)
    const moreOptionsButton = screen.getByRole('button', { name: 'More Options' })

    fireEvent.click(moreOptionsButton)
    expect(mockOnToggleMenu).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnToggleMenu).toHaveBeenCalledWith(false)
  }) 
})

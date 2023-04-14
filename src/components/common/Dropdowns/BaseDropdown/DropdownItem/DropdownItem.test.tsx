import { fireEvent, render, screen } from '../../../../../test-utils'
import DropdownItem from './DropdownItem'

describe('DropdownItem', () => {
  const props = {
    children: 'Menu Item',
    icon: <svg/>,
    onClick: jest.fn(),
    setMenuOpen: jest.fn(),
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a button with correct text', () => {
    render(<DropdownItem {...props} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(props.children)).toBeInTheDocument()
    // expect(screen.getByText(props.icon)).toEqual(props.icon)
  })

  it('calls onClick and setMenuOpen when button is clicked', () => {
    render(<DropdownItem {...props} />)
    fireEvent.click(screen.getByRole('button'))
    expect(props.onClick).toHaveBeenCalled()
    expect(props.setMenuOpen).toHaveBeenCalled()
    expect(props.setMenuOpen).toHaveBeenCalledWith(false)
  })

  it('does not call setMenuOpen when it is not provided', () => {
    render(<DropdownItem {...props} setMenuOpen={undefined} />)
    fireEvent.click(screen.getByRole('button'))
    expect(props.onClick).toHaveBeenCalled()
    expect(props.setMenuOpen).not.toHaveBeenCalled()
  })
})

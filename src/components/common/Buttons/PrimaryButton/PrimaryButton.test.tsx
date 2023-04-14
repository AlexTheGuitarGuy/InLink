import { HashRouter} from 'react-router-dom'
import { fireEvent, render, screen } from '../../../../test-utils'
import PrimaryButton, { ButtonColor } from './PrimaryButton'

describe('PrimaryButton', () => {
  it('renders the button with default props', () => {
    render(<PrimaryButton>Click me!</PrimaryButton>)
    const button: HTMLButtonElement = screen.getByText('Click me!')
    expect(button).toBeInTheDocument()
    expect(button.disabled).toBe(false)
  })

  it('renders the button with custom text', () => {
    render(<PrimaryButton>Submit form</PrimaryButton>)
    const button = screen.getByText('Submit form')
    expect(button).toBeInTheDocument()
  })

  it('renders the button with custom class name', () => {
    render(<PrimaryButton className='my-custom-class'>Click me!</PrimaryButton>)
    const button = screen.getByText('Click me!')
    expect(button).toHaveClass('my-custom-class')
  })

  it('renders the button with custom color', () => {
    render(<PrimaryButton color={ButtonColor.rose}>Click me!</PrimaryButton>)
    const button = screen.getByText('Click me!')
    expect(button).toHaveClass('bg-rose-600 ring-rose-400')
  })

  it('renders the button as a NavLink when `as` prop is `navlink`', () => {
    render(
      <HashRouter>
        <PrimaryButton as='navlink' to='/dashboard'>
          Go to dashboard
        </PrimaryButton>
      </HashRouter>,
    )
    const link = screen.getByText('Go to dashboard')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#/dashboard')
  })

  it('calls the onClick function when button is clicked', () => {
    const handleClick = jest.fn()
    render(<PrimaryButton onClick={handleClick}>Click me!</PrimaryButton>)
    const button = screen.getByText('Click me!')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables the button when `disabled` prop is true', () => {
    render(<PrimaryButton disabled>Click me!</PrimaryButton>)
    const button = screen.getByText('Click me!')
    expect(button).toBeDisabled()
  })
})

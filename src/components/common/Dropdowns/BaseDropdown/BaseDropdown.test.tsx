import { render, screen } from '@/test-utils'
import BaseDropdown from './BaseDropdown'

describe('Dropdown', () => {
  const testChildren = [
    <div key='1'>Child 1</div>,
    <div key='2'>Child 2</div>,
    <div key='3'>Child 3</div>,
  ]

  it('renders with default props', () => {
    render(<BaseDropdown open={true} children={testChildren} />)
    const dropdown = screen.getByRole('list')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown.children.length).toBe(3)
  })

  it('applies custom position styles', () => {
    render(<BaseDropdown open={true} children={testChildren} absolutePosition='left-0' />)
    const dropdown = screen.getByRole('list')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveClass('left-0')
  })

  it('does not render when closed', () => {
    render(<BaseDropdown open={false} children={testChildren} />)
    const dropdown = screen.getByRole('list')

    expect(dropdown).toHaveClass('opacity-0')
  })
})

import { fireEvent, render, screen } from '@/test-utils'
import BaseDialog from './BaseDialog'

describe('BaseDialog', () => {
  const handleClose = jest.fn()
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleClose.mockClear()
    handleSubmit.mockClear()
  })

  it('renders the dialog with the correct name', () => {
    render(<BaseDialog isShown onClose={handleClose} name='My Dialog' />)
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
  })

  it('renders the dialog with the correct children', () => {
    render(
      <BaseDialog isShown onClose={handleClose}>
        <div>Child Content</div>
      </BaseDialog>,
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('calls the onClose callback when the Cancel button is clicked', () => {
    render(<BaseDialog isShown onClose={handleClose} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(handleClose).toHaveBeenCalled()
  })

  it('calls the onSubmit callback when the Done button is clicked', () => {
    render(<BaseDialog isShown onClose={handleClose} onSubmit={handleSubmit} />)
    fireEvent.click(screen.getByText('Done'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('does not render the footer when showFooter is false', () => {
    render(<BaseDialog isShown onClose={handleClose} showFooter={false} />)
    expect(screen.queryByText('Done')).not.toBeInTheDocument()
  })

  it('renders a custom footer when customFooter prop is provided', () => {
    const customFooter = <div data-testid='custom-footer'>Custom Footer</div>
    render(<BaseDialog isShown onClose={handleClose} customFooter={customFooter} />)
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
  })
})

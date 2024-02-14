import { fireEvent, render, screen } from '@/test-utils'
import ChatShortcut from './ChatShortcut'

describe('ChatShortcut component', () => {
  it('renders without crashing', () => {
    render(<ChatShortcut onOpen={() => {}} />)
  })

  it('clicking the button calls the onOpen prop', () => {
    const onOpen = jest.fn()
    render(<ChatShortcut onOpen={onOpen} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onOpen).toHaveBeenCalled()
  })

  /* it('dragging the button changes its position', () => {
  render(<ChatShortcut onOpen={() => {}} />)
  const button = screen.getByRole('button')
  const { x, y } = button.getBoundingClientRect()
  fireEvent.mouseDown(button, { clientX: x, clientY: y })
  fireEvent.mouseMove(button, { clientX: x + 100, clientY: y + 100 })
  fireEvent.mouseUp(button)
  const { x: newX, y: newY } = button.getBoundingClientRect()
  expect(newX).not.toBe(x)
  expect(newY).not.toBe(y)
}) */
})

import { render, screen } from '../../../test-utils'
import Loading, { Dimensions } from './Loading'

describe('Loading', () => {
  it('renders a loading spinner at default dimensions', () => {
    render(<Loading />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-60 h-60 animate-spin fill-primaryBg')
  })

  it('renders a small loading spinner', () => {
    render(<Loading dimensions={Dimensions.SMALL} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('w-4 w-4 animate-spin fill-primaryBg')
  })

  it('renders a medium loading spinner', () => {
    render(<Loading dimensions={Dimensions.MEDIUM} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('w-8 w-8 animate-spin fill-primaryBg')
  })

  it('renders a large loading spinner', () => {
    render(<Loading dimensions={Dimensions.LARGE} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('w-12 h-12 animate-spin fill-primaryBg')
  })

  it('renders a fullscreen loading spinner', () => {
    render(<Loading dimensions={Dimensions.FULLSCREEN} />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('w-60 h-60 animate-spin fill-primaryBg')
    expect(spinner.parentElement).toHaveClass('h-screen xl:h-[92vh] lg:h-[88vh]')
  })
})

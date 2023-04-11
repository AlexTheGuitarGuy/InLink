import App from './App'
import { render } from './test-utils'

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })
})

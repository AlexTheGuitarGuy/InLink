import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'

import store from './redux/store'

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <Provider store={store}>children</Provider>,
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }

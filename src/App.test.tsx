import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

test('renders app', () => {
  const div = document.createElement('div');
  render(<App />);
  unmountComponentAtNode(div);
});

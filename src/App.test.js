import { render } from '@testing-library/react';
import InLinkApp from './App';
import { unmountComponentAtNode } from 'react-dom';

test('renders app', () => {
  const div = document.createElement('div');
  render(<InLinkApp />);
  unmountComponentAtNode(div);
});

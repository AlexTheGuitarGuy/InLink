import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import InLinkApp from './App';

test('renders app', () => {
  const div = document.createElement('div');
  render(<InLinkApp />);
  unmountComponentAtNode(div);
});

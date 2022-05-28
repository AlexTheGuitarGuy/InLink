import { render } from '@testing-library/react';
import GachiFinderApp from './App';
import { unmountComponentAtNode } from 'react-dom';

test('renders app', () => {
  const div = document.createElement('div');
  render(<GachiFinderApp />);
  unmountComponentAtNode(div);
});

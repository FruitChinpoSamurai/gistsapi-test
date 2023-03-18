import { render, screen } from '@testing-library/react';
import App from './App';

// I have not performed any unit testing.
// Always preferred to manually test my code (personal projects) for edge cases before moving on to something else.

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app')
  expect(linkElement).toBeInTheDocument();
});

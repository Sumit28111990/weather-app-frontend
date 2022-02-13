import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './Weather';

test('renders weather markdown page', () => {
  render(<Weather />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';

test('renders image upload page', () => {
  render(<Image />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

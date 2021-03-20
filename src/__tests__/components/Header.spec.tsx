import React from 'react';
import { render } from '@testing-library/react';

import Header from '../../components/Header';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Header component', () => {
  it('should be able to go to favorites page', async () => {
    const { getByAltText } = render(<Header />);

    const logoElement = getByAltText('Cinema App');

    expect(logoElement).toBeTruthy();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';



describe('test apis', () => {

  test('renders App correct', async () => {
    render(<App />);
    screen.debug()
    const title = screen.getByText(/supes/i);
    expect(title).toBeInTheDocument();
    const addButton = screen.getByText(/add hero/i);
    expect(addButton).toBeInTheDocument();
    const heroes = screen.findByTestId
    screen.debug()
  });
})
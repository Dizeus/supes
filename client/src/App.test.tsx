import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {setupStore} from "./store/store";

describe('With React Testing Library', () => {
  test('App renders & add button open modal', async () => {
    render(
        <Provider store={setupStore()}>
          <App />
        </Provider>
    );
    const title = screen.getByText(/supes/i);
    expect(title).toBeInTheDocument();
    const addButton = screen.getByText(/add hero/i);
    expect(addButton).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).toBeNull();
    fireEvent.click(addButton)
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  })
});

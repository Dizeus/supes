import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {setupStore} from "./store/store";

;

describe('With React Testing Library', () => {

  it('Shows "Hello world!"', () => {
    const { getByText } = render(
        <Provider store={setupStore()}>
          <App />
        </Provider>
    );

    expect(getByText('Hello World!')).not.toBeNull();
  });
});

describe('test apis', () => {

  test('renders App correct', async () => {
    render(<App />);
    const title = screen.getByText(/supes/i);
    expect(title).toBeInTheDocument();
    const addButton = screen.getByText(/add hero/i);
    expect(addButton).toBeInTheDocument();
  });
})
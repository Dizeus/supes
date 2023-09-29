import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {setupStore} from "./store/store";

const initialStateOne = {
  heroReducer: {
    heroes: [{
      id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
      nickname: "Batman",
      real_name: "Bruce Wayne",
      origin: "Gotham - Babylon of criminal world",
      phrase: "I am Vengeance",
      superpowers: "Money, ninja",
      images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
    }],
    currentHero: null,
    totalPages: 0,
    page: 1,
    modal: 'none'
  }
}

describe('Test App ', () => {
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
  })
  test('Add Modal', async () => {
    render(
        <Provider store={setupStore()}>
          <App />
        </Provider>
    );
    const addButton = screen.getByText(/add hero/i);
    expect(screen.queryByTestId('modal')).toBeNull();
    fireEvent.click(addButton)
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    const close = screen.getByTestId('closeModal');
    fireEvent.click(close)
    expect(screen.queryByTestId('modal')).toBeNull();
  })
  test('Edit Modal', async () => {
    render(
        <Provider store={setupStore(initialStateOne)}>
          <App />
        </Provider>
    );
    expect(screen.queryByTestId('modal')).toBeNull();
    const edit = screen.getAllByTestId('edit');;
    fireEvent.click(edit[0])
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    const close = screen.getByTestId('closeModal')
    fireEvent.click(close)
    expect(screen.queryByTestId('modal')).toBeNull();
  })
});

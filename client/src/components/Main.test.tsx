import {render, screen} from "@testing-library/react";
import App from "../App";
import React from "react";
import Main from "./Main";

describe('test apis', () => {

    test('renders App correct', async () => {
        render(<Main />);
        const main = screen.getByTestId('main');
        expect(main).toBeInTheDocument();
        screen.debug()
        const heroes = await screen.findAllByTestId('heroCard')
        expect(heroes.length).toBe(2);
        screen.debug()
        const addButton = screen.getByText(/add hero/i);
        expect(addButton).toBeInTheDocument();
    });

})
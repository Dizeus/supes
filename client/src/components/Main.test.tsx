import {render, screen} from "@testing-library/react";
import React from "react";
import Main from "./Main";
import {Provider} from "react-redux";
import {setupStore} from "../store/store";

describe('Test Main', () => {

    test('Main empty', () => {
        render(
            <Provider store={setupStore()}>
                <Main />
            </Provider>);
        const main = screen.getByTestId('main');
        expect(main).toBeInTheDocument();
        const noHeroes = screen.getByText(/There is no heroes yet/i);
        expect(noHeroes).toBeInTheDocument();
    });

})
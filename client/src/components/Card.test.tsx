import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {setupStore} from "../store/store";
import Card from "./Card";

const hero = {
    id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
    nickname: "Batman",
    real_name: "Bruce Wayne",
    origin: "Gotham - Babylon of criminal world",
    phrase: "I am Vengeance",
    superpowers: "Money, ninja",
    images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
}

describe('Test Card', () => {

    test('Reversing of card', () => {
        render(
            <Provider store={setupStore()}>
                <Card hero={hero}/>
            </Provider>);
        const viewMore = screen.getByTestId('viewMore');
        const viewLess = screen.getByTestId('viewLess');
        expect(screen.getByTestId('heroCardBody').className).toBe('card__body');
        fireEvent.click(viewMore)
        expect(screen.getByTestId('heroCardBody').className).toBe('card__body card__body_active');
        fireEvent.click(viewLess)
        expect(screen.getByTestId('heroCardBody').className).toBe('card__body');
    });

})
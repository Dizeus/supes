import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {setupStore} from "../store/store";
import BackCard from "./BackCard";


const hero = {
    id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
    nickname: "Batman",
    real_name: "Bruce Wayne",
    origin: "Gotham - Babylon of criminal world",
    phrase: "I am Vengeance",
    superpowers: "Money, ninja",
    images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
}

describe('Test BackCard', () => {

    test('Test slider', () => {
        render(
            <Provider store={setupStore()}>
                <BackCard hero={hero} setActive={()=>{}}/>
            </Provider>);
        const next = screen.getByTestId('next');
        const prev = screen.getByTestId('prev');
        expect(screen.getByTestId('heroImage')).toHaveAttribute('src', hero.images[0])
        fireEvent.click(next)
        expect(screen.getByTestId('heroImage')).toHaveAttribute('src', hero.images[1])
        fireEvent.click(prev)
        expect(screen.getByTestId('heroImage')).toHaveAttribute('src', hero.images[0])
    });
})
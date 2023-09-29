import {findAllByTestId, fireEvent, render, screen, waitFor} from "@testing-library/react";
import React from "react";
import Main from "./Main";
import {Provider} from "react-redux";
import {setupStore} from "../store/store";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import axios from "axios/index";

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
    }
}
const resultDelete = {data: {message: "Successful deleted"}, status: 200}
const initialStateMultiple = {
    heroReducer: {
        heroes: [
            {
            id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        },{
            id: "b5ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        },{
            id: "b6ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        },{
            id: "b7ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        },{
            id: "b8ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        },{
            id: "b9ad176c-c279-4498-a638-30ddb0baf6b4",
            nickname: "Batman",
            real_name: "Bruce Wayne",
            origin: "Gotham - Babylon of criminal world",
            phrase: "I am Vengeance",
            superpowers: "Money, ninja",
            images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
        }],
        currentHero: null,
        totalPages: 2,
        page: 1,
    }
}

jest.mock('axios')

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
    test('Main with one hero', () => {
        render(
            <Provider store={setupStore(initialStateOne)}>
                <Main />
            </Provider>);
        const main = screen.getByTestId('main');
        expect(main).toBeInTheDocument();
        const pagination = screen.queryByTestId('pagination')
        expect(pagination).toBeNull()
        const heroes = screen.getAllByTestId('heroCard');
        expect(heroes.length).toBe(1);
    });

    test('Main with pagination', async () => {

        render(
            <Provider store={setupStore(initialStateMultiple)}>
                <Main />
            </Provider>);
        const pagination = screen.queryByTestId('pagination')
        const page = screen.getAllByTestId('pagination-page')
        expect(pagination).toBeInTheDocument()
        expect(page[0].className).toBe('main__page main__page_active');
        act(() => {
            userEvent.click(page[1])
        });
        expect((await screen.findAllByTestId('pagination-page'))[0].className).toBe('main__page');
        expect((await screen.findAllByTestId('pagination-page'))[1].className).toBe('main__page main__page_active');
        expect(page.length).toBe(2)
        const heroes = screen.getAllByTestId('heroCard');
        expect(heroes.length).toBe(6);
    });

    test('Delete card', async () => {
        (axios.delete as jest.Mock).mockReturnValue(resultDelete);
        render(
               <Provider store={setupStore(initialStateMultiple)}>
                   <Main/>
               </Provider>);
        const viewMore = screen.getAllByTestId('viewMore')
        act(() => {
            fireEvent.click(viewMore[0])
        });
        const del = screen.getAllByTestId('delete')
        act(() => {
            fireEvent.click(del[0])
        });
        await new Promise((r) => setTimeout(r, 50));
        expect((await screen.findAllByTestId('heroCard')).length).toBe(5)

    });
})
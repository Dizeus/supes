import {createHero, editHero, getHeroes, removeHero} from "./heroActionCreators";
import axios from 'axios';
import {cleanup} from "@testing-library/react";
jest.mock('axios')

const responseDelete = {data: {message: "Successful deleted"}, status: 200}
const responseGet = {
    data: {
        heroes: [
            {
                id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
                nickname: "superman",
                real_name: "Clark Kent",
                origin: "Cripton",
                phrase: "Look in the sky",
                superpowers: "strength",
                images: ['D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg', 'D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg']
            }],
        rows: 1
    },
    status: 200
}
const responsePostPut ={data: {
        id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
        nickname: "Batman",
        real_name: "Bruce Wayne",
        origin: "Gotham - Babylon of criminal world",
        phrase: "I am Vengeance",
        superpowers: "Money, ninja",
        images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
    }, status: 200}

describe('Testing Thunks', () => {

    afterAll(() => {
        cleanup();
    });
    test('Test getHeroes', async () => {
        (axios.get as jest.Mock).mockReturnValue(responseGet);
        const thunk = getHeroes(1)
        const dispatchMock = jest.fn()
        await thunk(dispatchMock)
        expect(dispatchMock).toBeCalledTimes(2);
        expect(axios.get).toBeCalledTimes(1)
    })
    test('Test removeHero', async () => {
        (axios.delete as jest.Mock).mockReturnValue(responseDelete);
        const thunk = removeHero("b4ad176c30ddb0baf6b4")
        const dispatchMock = jest.fn()
        await thunk(dispatchMock)
        expect(dispatchMock).toBeCalledTimes(1);
        expect(axios.delete).toBeCalledTimes(1)
    })
    test('Test createHero', async () => {
        (axios.post as jest.Mock).mockReturnValue(responsePostPut);
        const thunk = createHero(new FormData())
        const dispatchMock = jest.fn()
        await thunk(dispatchMock)
        expect(dispatchMock).toBeCalledTimes(1);
        expect(axios.post).toBeCalledTimes(1)
    })
    test('Test editHero', async () => {
        (axios.put as jest.Mock).mockReturnValue(responsePostPut);
        const thunk = editHero(new FormData())
        const dispatchMock = jest.fn()
        await thunk(dispatchMock)
        expect(dispatchMock).toBeCalledTimes(1);
        expect(axios.put).toBeCalledTimes(1)
    })

})





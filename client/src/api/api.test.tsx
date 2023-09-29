import axios from 'axios';
import {api} from './api';
import {IHero} from "../types/hero";

jest.mock('axios')

const responseGet: {data: {heroes: IHero[]}} = {
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
    }
}
const responsePost: {data:  IHero} = {
    data: {
                id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
                nickname: "superman",
                real_name: "Clark Kent",
                origin: "Cripton",
                phrase: "Look in the sky",
                superpowers: "strength",
                images: ['D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg', 'D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg']
    }
}
const responseDelete: {data: {message: string}, status: number} = {data: {message: "Successful deleted"}, status: 200}
describe('test apis', () => {


    test('test getHeroes', async () => {
        (axios.get as jest.Mock).mockReturnValue(responseGet);
        const data = await api.getHeroes(1)
        expect(axios.get).toBeCalledTimes(1);
        expect(data?.data).toEqual(responseGet.data);
    })
    test('test addHero', async () => {
        (axios.post as jest.Mock).mockReturnValue(responsePost);
        const data = await api.addHero(new FormData())
        expect(axios.post).toBeCalledTimes(1);
        expect(data?.data).toEqual(responsePost.data);
    })
    test('test editHero', async () => {
        (axios.put as jest.Mock).mockReturnValue(responsePost);
        const data = await api.editHero(new FormData())
        expect(axios.put).toBeCalledTimes(1);
        expect(data?.data).toEqual(responsePost.data);
    })
    test('test deleteHero', async () => {
        (axios.delete as jest.Mock).mockReturnValue(responseDelete);
        const data = await api.deleteHero('1')
        expect(axios.delete).toBeCalledTimes(1);
        expect(data?.data).toEqual(responseDelete.data);
    })
})
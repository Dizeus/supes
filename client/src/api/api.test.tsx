import axios from 'axios';
import {api} from './api';
import {IHero} from "../types/hero";

jest.mock('axios')

describe('test apis', () => {
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
    const responsePost: {data: IHero} = {
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
    test('test getHeroes', async () => {
        (axios.get as jest.Mock).mockReturnValue(responseGet);
        const data = await api.getHeroes(1)
        expect(axios.get).toBeCalledTimes(1);
        expect(data?.data).toEqual(responseGet.data);
    })
})
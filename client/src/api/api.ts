import axios from "axios";
import {IHero} from "../types/hero";
export const api = {

    async getHeroes() {
        try {
            const response = await axios.get<IHero[]>('/api/heroes')
            return response
        } catch (err) {
            console.error(err)
        }
    },
    async addHero(hero: any) {
        try {
            const response = await axios.post<IHero>('/api/heroes', hero)
            console.log(response.data)
            return response
        } catch (err) {
            console.error(err)
        }
    },
    async updateHero(hero: IHero, id: string) {
        try {
            const response = await axios.put<IHero>(`/api/heroes/${id}`, hero)
            console.log(response.data)
            return response
        } catch (err) {
            console.error(err)
        }
    },
    async deleteHero(id: string) {
        try {
            const response = await axios.delete<IHero>(`/api/heroes/${id}`)
            console.log(response.data)
            return response
        } catch (err) {
            console.error(err)
        }
    },
}
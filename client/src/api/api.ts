import axios from "axios";
import {IHero, IHeroSend} from "../types/hero";
import {heroSlice} from "../store/reducers/heroSlice";
export const api = {

    async getHeroes(page: number) {
        try {
            const response = await axios.get<{heroes: IHero[], rows:number}>(`/api/heroes/${page}`)
            return response
        } catch (err) {
            console.error(err)
        }
    },
    async addHero(hero: FormData) {
        try {
            const response = await axios.post<IHero>('/api/heroes', hero, {headers: {"Content-Type": "multipart/form-data"}},)
            console.log(response.data)
            return response
        } catch (err) {
            console.error(err)
        }
    },
    async editHero(hero: FormData) {
        try {
            const response = await axios.put<IHero>(`/api/heroes`, hero)
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
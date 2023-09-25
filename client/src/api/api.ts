import axios from "axios";
import {IHero} from "../types/hero";
export const api = {

    async getHeroes(page: number) {
        try {
            return await axios.get<{heroes: IHero[], rows:number}>(`/api/heroes/${page}`)
        } catch (err) {
            console.error(err)
        }
    },
    async addHero(hero: FormData) {
        try {
            return await axios.post<IHero>('/api/heroes', hero, {headers: {"Content-Type": "multipart/form-data"}},)
        } catch (err) {
            console.error(err)
        }
    },
    async editHero(hero: FormData) {
        try {
            return await axios.put<IHero>(`/api/heroes`, hero)
        } catch (err) {
            console.error(err)
        }
    },
    async deleteHero(id: string) {
        try {
            return await axios.delete<IHero>(`/api/heroes/${id}`)
        } catch (err) {
            console.error(err)
        }
    },
}
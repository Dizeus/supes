import {api} from "../../api/api";
import {AppDispatch} from "../store";
import {setHeroes, addHero, deleteHero, updateHero, setTotalPages} from "./heroSlice";

export const getHeroes = (page: number) => async (dispatch: AppDispatch) =>{
    try {
        const response = await api.getHeroes(page)
        if(response?.status == 200){
            dispatch(setHeroes(response.data.heroes))
            dispatch(setTotalPages(Math.ceil(response.data.rows/5)))
        }
    } catch (e) {
        console.error(e)
    }
}

export const createHero = (hero: FormData) => async (dispatch: AppDispatch) =>{
    try {
        const response = await api.addHero(hero)
        if(response?.status == 200){
            dispatch(addHero(response.data))
        }
    } catch (e) {
        console.error(e)
    }
}
export const editHero = (hero: FormData) => async (dispatch: AppDispatch) =>{
    try {
        const response = await api.editHero(hero)
        if(response?.status == 200){
            dispatch(updateHero(response.data))
        }
    } catch (e) {
        console.error(e)
    }
}
export const removeHero = (id: string) => async (dispatch: AppDispatch) =>{
    try {
        const response = await api.deleteHero(id)
        if(response?.status == 200){
            dispatch(deleteHero(id))
        }

    } catch (e) {
        console.error(e)
    }
}
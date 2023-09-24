import {api} from "../../api/api";
import {AppDispatch} from "../store";
import {setHeroes, addHero, deleteHero} from "./heroSlice";

export const getHeroes = () => async (dispatch: AppDispatch) =>{
    try {
        const response = await api.getHeroes()
        if(response?.status == 200){
            dispatch(setHeroes(response.data))
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
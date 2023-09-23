import {api} from "../../api/api";
import {AppDispatch} from "../store";
import {setHeroes, addHero} from "./heroSlice";
import {IHeroSend} from "../../types/hero";

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
import {HeroAction, HeroActionTypes} from "../types/hero";
import {IHero} from "../types/hero";
import {Dispatch} from "react";
import {api} from "../api/api";

export const setHeroes = (payload: IHero[]): HeroAction => {
    return {type: HeroActionTypes.SET_HEROES, payload}
}
export const addHero = (payload: IHero): HeroAction => {
    return {type: HeroActionTypes.ADD_HERO, payload}
}
export const updateHero = (payload: IHero): HeroAction => {
    return {type: HeroActionTypes.UPDATE_HERO, payload}
}
export const delHero = (payload: string): HeroAction => {
    return {type: HeroActionTypes.DELETE_HERO, payload}
}
export const setCurrentHero = (payload: IHero): HeroAction => {
    return {type: HeroActionTypes.SET_CURRENT_HERO, payload}
}

export const getHeroes = () => async (dispatch: Dispatch<HeroAction>) =>{
    try {
        const response = await api.getHeroes()
        if(response?.status == 200){
            dispatch(setHeroes(response.data))
        }
    } catch (e) {
        console.error(e)
    }
}
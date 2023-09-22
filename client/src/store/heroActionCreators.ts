import {HeroAction, HeroActionTypes} from "../types/hero";
import {IHero} from "../types/hero";


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
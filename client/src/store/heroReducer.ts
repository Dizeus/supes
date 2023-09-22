import {HeroAction, HeroActionTypes, HeroState} from "../types/hero";

const initialState: HeroState = {
    heroes: [],
    currentHero: null
}

export const heroReducer = (state = initialState, action: HeroAction): HeroState => {
    switch (action.type) {
        case HeroActionTypes.SET_HEROES:
            return {...state, heroes: action.payload}
        case HeroActionTypes.ADD_HERO:
            return {...state, heroes: [...state.heroes, action.payload]}
        case HeroActionTypes.UPDATE_HERO:
            return {...state, heroes: [...state.heroes.filter(x=>action.payload.id !== x.id), action.payload]}
        case HeroActionTypes.DELETE_HERO:
            return {...state, heroes: [...state.heroes.filter(x=>action.payload!== x.id)]}
        case HeroActionTypes.SET_CURRENT_HERO:
            return {...state, currentHero: action.payload}
        default:
            return state
    }
}
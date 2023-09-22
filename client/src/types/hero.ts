export interface IHero {
    id: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string,
    images: string[]
}

export interface HeroState {
    heroes: IHero[];
    currentHero: IHero | null;
}

export enum HeroActionTypes {
    SET_HEROES="SET_HEROES",
    ADD_HERO = "ADD_HERO",
    UPDATE_HERO = "UPDATE_HERO",
    DELETE_HERO = "DELETE_HERO",
    SET_CURRENT_HERO = "SET_CURRENT_HERO"
}

interface SetHeroesAction {
    type: HeroActionTypes.SET_HEROES,
    payload: IHero[]
}
interface AddHeroAction {
    type: HeroActionTypes.ADD_HERO,
    payload: IHero
}
interface UpdateHeroAction {
    type: HeroActionTypes.UPDATE_HERO,
    payload: IHero;
}
interface DeleteHeroAction {
    type: HeroActionTypes.DELETE_HERO,
    payload: string;
}
interface SetCurrHeroAction {
    type: HeroActionTypes.SET_CURRENT_HERO,
    payload: IHero;
}
export type HeroAction = SetHeroesAction
    | AddHeroAction
    | UpdateHeroAction
    | DeleteHeroAction
    | SetCurrHeroAction

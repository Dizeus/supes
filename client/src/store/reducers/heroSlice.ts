import {IHero} from "../../types/hero";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HeroState {
    heroes: IHero[];
    modal: string;
    currentHero: IHero | null;
    totalPages: number;
    page: number

}

const initialState: HeroState = {
    heroes: [],
    modal: 'none',
    currentHero: null,
    totalPages: 0,
    page: 1,
}

export const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        setHeroes(state, action: PayloadAction<IHero[]>){
            state.heroes = action.payload
        },
        addHero(state,action: PayloadAction<IHero> ){
            state.heroes.push(action.payload)
        },
        updateHero(state,action: PayloadAction<IHero> ){
            state.heroes = state.heroes.map(hero=> hero.id !== action.payload.id ? hero : action.payload)
        },
        deleteHero(state,action: PayloadAction<string> ){
            state.heroes = [...state.heroes.filter(hero=>hero.id!==action.payload)]
        },
        setModal(state,action: PayloadAction<string> ){
            state.modal = action.payload
        },
        setCurrentHero(state,action: PayloadAction<IHero | null> ){
            state.currentHero = action.payload
        },
        setTotalPages(state,action: PayloadAction<number> ){
            state.totalPages = action.payload
        },
        setPage(state,action: PayloadAction<number> ){
            state.page = action.payload
        }
    }
})

export const {addHero, updateHero, setHeroes, deleteHero, setModal, setCurrentHero, setPage, setTotalPages} = heroSlice.actions
export default heroSlice.reducer;
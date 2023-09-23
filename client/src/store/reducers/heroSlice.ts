import {IHero} from "../../types/hero";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HeroState {
    heroes: IHero[];
}

const initialState: HeroState = {
    heroes: []
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
            state.heroes = [...state.heroes.filter(hero=>hero.id!==action.payload.id), action.payload]
        },
        deleteHero(state,action: PayloadAction<string> ){
            state.heroes = [...state.heroes.filter(hero=>hero.id!==action.payload)]
        },
    }
})

export const {addHero, updateHero, setHeroes, deleteHero} = heroSlice.actions
export default heroSlice.reducer;
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import heroReducer from "./reducers/heroSlice";

const rootReducer = combineReducers({
    heroReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {heroReducer} from "./heroReducer";
export const store = createStore(heroReducer, applyMiddleware(thunk))
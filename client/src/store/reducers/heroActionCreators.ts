import {api} from "../../api/api";
import {AppDispatch} from "../store";
import {setHeroes} from "./heroSlice";

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
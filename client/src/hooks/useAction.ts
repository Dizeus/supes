import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as HeroActionCreators from '../store/heroActionCreators'


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(HeroActionCreators, dispatch)
}
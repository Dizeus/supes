import {TypedUseSelectorHook, useSelector} from "react-redux";
import {HeroState} from "../types/hero";

export const useTypedSelector: TypedUseSelectorHook<HeroState> = useSelector
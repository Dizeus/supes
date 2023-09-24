import React from 'react';
import {IHero} from "../types/hero";
import Card from "./Card";
import {useTypedSelector} from "../hooks/useTypedSelector";
import '../styles/Main.scss'
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {setPage} from "../store/reducers/heroSlice";
import {getHeroes} from "../store/reducers/heroActionCreators";

interface MainProps {

}
const Main: React.FC<MainProps> = () => {

    const {heroes, totalPages, page} = useTypedSelector(state=>state.heroReducer)
    const dispatch = useTypedDispatch()

    const onClickPage = (n: number)=>{
        dispatch(setPage(n))
        dispatch(getHeroes(n))
    }
    return (
        <div data-testid='main' className='main'>
            {heroes.length > 0?
                <>
                    <div className='main__pagination'>
                        {[...Array(totalPages)].map((x, i) =>
                            <div key={i+1} className={`main__page${page==1+i?' main__page_active': ''}`} onClick={()=>onClickPage(i+1)}>{i+1}</div>
                        )}
                    </div>
                    <div className='main__cards'>
                        {heroes.map(hero=><Card key={hero.id} hero={hero}/>)}
                    </div>
                </>
                :
                <div className='main__message'>There is no heroes yet</div>
            }

        </div>
    );
};

export default Main;
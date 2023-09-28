import React from 'react';
import Card from "./Card";
import {useTypedSelector} from "../hooks/useTypedSelector";
import '../styles/Main.scss'
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {setPage} from "../store/reducers/heroSlice";
import {getHeroes} from "../store/reducers/heroActionCreators";

const Main= () => {

    const {heroes, totalPages, page} = useTypedSelector(state=>state.heroReducer)
    const dispatch = useTypedDispatch()
    const onClickPage = (n: number)=>{
        if(page!=n) {
            dispatch(setPage(n))
        }
        dispatch(getHeroes(n))
    }
    return (
        <div data-testid='main' className='main'>
            {heroes.length > 0?
                <>
                    {
                        totalPages > 1 &&
                        <div className='main__pagination' data-testid='pagination'>
                            {[...Array(totalPages)].map((x, i) =>
                                <div data-testid='pagination-page' key={i + 1} className={`main__page${page == 1 + i ? ' main__page_active' : ''}`}
                                     onClick={() => onClickPage(i + 1)}>{i + 1}</div>
                            )}
                        </div>
                    }
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
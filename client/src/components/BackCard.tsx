import React, {useState} from 'react';
import {IHero} from "../types/hero";
import '../styles/BackCard.scss';
import del from '../assets/icons/delete.svg';
import edit from '../assets/icons/edit.svg';
import ret from '../assets/icons/return.svg';
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {removeHero} from "../store/reducers/heroActionCreators";
import {setCurrentHero, setModal} from "../store/reducers/heroSlice";
interface BackCardProps{
    hero: IHero,
    setActive: (active: boolean) => void,
}
const BackCard: React.FC<BackCardProps> = ({hero, setActive}) => {
    const [slide, setSlide] = useState<number>(0)
    const dispatch = useTypedDispatch()

    const openEdit = () => {
        dispatch(setModal('edit'))
        dispatch(setCurrentHero(hero))
    }
    return (
        <div className="card__back back">
            <button disabled={slide===0} className='back__prev' onClick={()=>setSlide(slide-1)} data-testid='prev'>&#x2039;</button>
            <button disabled={slide===hero.images.length-1} className='back__next' onClick={()=>setSlide(slide+1)} data-testid='next'>&#x203A;</button>
            <div className='back__buttons'>
                <img alt='back' data-testid='viewLess' onClick={()=>setActive(false)} src={ret} className='back_return'/>
                <img alt='edit' data-testid='edit' src={edit} onClick={openEdit} className='back_edit'/>
                <img alt='delete' data-testid='delete' src={del} onClick={()=>dispatch(removeHero(hero.id))} className='back_delete'/>
            </div>
            <img className='back__img' src={hero.images[slide]} alt="hero" data-testid='heroImage'/>
            <div className="back__content">
                <h2 className='back__title'>{hero.nickname}</h2>
                <div className='back__desc'>
                        <p className='back__info'><span>Real name: </span>{hero.real_name}</p>
                        <p className='back__info'><span>Catch phrase: </span>{hero.phrase}</p>
                        <p className='back__info'><span>Superpowers: </span>{hero.superpowers}</p>
                        <p className='back__info'><span>Origin description: </span>{hero.origin}</p>
                </div>
            </div>
        </div>
    );
};

export default BackCard;
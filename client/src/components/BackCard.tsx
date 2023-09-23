import React, {useState} from 'react';
import {IHero} from "../types/hero";
import '../styles/BackCard.scss';

interface BackCardProps{
    hero: IHero,
    setActive: (active: boolean) => void
}
const BackCard: React.FC<BackCardProps> = ({hero, setActive}) => {
    const [slide, setSlide] = useState<number>(0)
    return (
        <div className="card__back back">
            <button onClick={()=>setActive(false)} className='myButton myButton_card'>&#x2190;</button>
            <button disabled={slide===0} className='back__prev' onClick={()=>setSlide(slide-1)}>&#x2039;</button>
            <button disabled={slide===hero.images.length-1} className='back__next' onClick={()=>setSlide(slide+1)}>&#x203A;</button>


            <img className='back__img' src={hero.images[slide]} alt="hero"/>
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
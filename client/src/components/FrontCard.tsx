import React from 'react';
import {IHero} from "../types/hero";
import '../styles/FrontCard.scss'
interface FrontCardProps{
    hero: IHero,
    setActive: (active: boolean) => void
}
const FrontCard : React.FC<FrontCardProps> = ({hero, setActive}) => {
    return (
        <div className="card__front front">
            <img className='front__img'
                 src={hero.images[0]}
                 alt="hero image"/>
            <h2 className='front__title'>{hero.nickname}</h2>
            <button data-testid='viewMore' onClick={()=>setActive(true)} className='myButton myButton_card'>View More</button>
        </div>
    );
};

export default FrontCard;
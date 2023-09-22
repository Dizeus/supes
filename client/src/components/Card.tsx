import React from 'react';
import {IHero} from "../types/hero";
import '../styles/Card.scss'
interface CardProps{
    hero: IHero;
}
const Card: React.FC<CardProps> = ({hero}) => {
    return (
        <div className="card">
            <img className='card__img'
                src={hero.images[0]}
                alt=""/>
            <div className="card__content">
                <h2 className='card__title'>{hero.nickname}</h2>
                <p className='card__text'>{hero.phrase}</p>
                 <a href="#" className="card__link">
                    Find out more
                 </a>
            </div>
        </div>
    );
};

export default Card;
import React, {useState} from 'react';
import {IHero} from "../types/hero";
import '../styles/Card.scss'
import BackCard from "./BackCard";
import FrontCard from "./FrontCard";
interface CardProps{
    hero: IHero;
}
const Card: React.FC<CardProps> = ({hero}) => {

    const [active, setActive] = useState(false)
    return (
        <div className="card">
            <div className={`card__body${active?' card__body_active':''}`}>
                    <FrontCard hero={hero} setActive={setActive}/>
                    <BackCard hero={hero} setActive={setActive}/>
            </div>
        </div>
    );
};

export default Card;
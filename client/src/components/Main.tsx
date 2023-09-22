import React from 'react';
import {IHero} from "../types/hero";
import Card from "./Card";
import {useTypedSelector} from "../hooks/useTypedSelector";
import '../styles/Main.scss'


const Main = () => {

    const {heroes} = useTypedSelector(state=>state)

    return (
        <div className='main'>
            {heroes.map(hero=><Card key={hero.id} hero={hero}/>)}
        </div>
    );
};

export default Main;
import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
import {IHero} from './types/hero';
import {api} from "./api/api";
function App() {

/*    const [heroes, setHeroes] = useState<IHero[] | null>(null)

    const getHeroes = async ()=>{
        const res = await api.getHeroes()
        console.log(res)
    }
    useEffect(()=>{
        getHeroes()
    },[])*/

    return (
        <div className="app">
           <Header/>
           <Main/>
        </div>
);
}

export default App;

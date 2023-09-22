import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
import {useActions} from "./hooks/useAction";
import {useTypedSelector} from "./hooks/useTypedSelector";
function App() {
    const {getHeroes} = useActions()

    useEffect(()=>{
        getHeroes()
    },[])

    return (
        <div className="app">
           <Header/>
           <Main/>
        </div>
);
}

export default App;

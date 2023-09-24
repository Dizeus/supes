import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
import {getHeroes} from "./store/reducers/heroActionCreators";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
import Modal from "./components/Modal";
import {setModal} from "./store/reducers/heroSlice";
import {useTypedSelector} from "./hooks/useTypedSelector";
function App() {

    const dispatch = useTypedDispatch()
    useEffect(()=>{
        dispatch(getHeroes(page))
    },[])

    const {modal, page} = useTypedSelector(state => state.heroReducer)

    return (
        <div className="app">
            {modal !== 'none' && <Modal  modal={modal}/>}
           <Header/>
           <Main/>
        </div>
);
}

export default App;

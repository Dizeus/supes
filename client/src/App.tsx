import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
import {getHeroes} from "./store/reducers/heroActionCreators";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
import Modal from "./components/Modal";
function App() {

    const [modal, setModal] = useState<string>('none')
    const dispatch = useTypedDispatch()
    useEffect(()=>{
        dispatch(getHeroes())
    },[])

    return (
        <div className="app">
            <Modal setModal={setModal}  modal={modal}/>
           <Header setModal={setModal}/>
           <Main/>

        </div>
);
}

export default App;

import React, {useEffect} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
import {getHeroes} from "./store/reducers/heroActionCreators";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
function App() {


    const dispatch = useTypedDispatch()
    useEffect(()=>{
        dispatch(getHeroes())
    },[])

    return (
        <div className="app">
           <Header/>
           <Main/>
        </div>
);
}

export default App;

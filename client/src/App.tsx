import React, {useEffect} from 'react';
import Header from "./components/Header";
import './styles/App.scss'
import Main from "./components/Main";
function App() {

    useEffect(()=>{

    },[])

    return (
        <div className="app">
           <Header/>
           <Main/>
        </div>
);
}

export default App;

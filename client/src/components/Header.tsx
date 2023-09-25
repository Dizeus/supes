import React from 'react';
import '../styles/Header.scss'
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {setModal} from "../store/reducers/heroSlice";


const Header = () => {
    const dispatch = useTypedDispatch()
    return (
        <header className='header'>
            <div className="header__container">
                <div className='header__supes'>Supes</div>
                <button onClick={()=>dispatch(setModal("add"))}  className='myButton'>Add hero</button>
            </div>
        </header>
    );
};

export default Header;
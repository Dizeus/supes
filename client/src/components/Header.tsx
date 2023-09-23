import React from 'react';
import '../styles/Header.scss'


const Header = ({setModal}: {setModal: (modal: string)=>void}) => {
    return (
        <header className='header'>
            <div className="header__container">
                <div className='header__supes'>Supes</div>
                <button onClick={()=>setModal("add")}  className='myButton'>Add hero</button>
            </div>
        </header>
    );
};

export default Header;
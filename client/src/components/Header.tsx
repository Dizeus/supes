import React from 'react';
import '../styles/Header.scss'
const Header = () => {
    return (
        <header className='header'>
            <div className="header__container">
                <div className='header__supes'>Supes</div>
                <button className='myButton'>Add hero</button>
            </div>
        </header>
    );
};

export default Header;
import React from 'react';
import './Navigation.css';

const Navigation = ({ changeRoute }) => {
    return(
        <nav className='SignOutBtn'>
            <button className='f5 link ma3 pa2 grow dib white bg-near-black pointer' onClick={() => changeRoute('signIn')}>Sign Out</button>
        </nav>
    );
};

export default Navigation;
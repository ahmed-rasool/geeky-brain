import React from 'react';
import './Navigation.css';

const Navigation = ({ changeRoute, userStatus }) => {
    if (userStatus === true) {
        return (
            <nav className='NavBtn mt3 mr3'>
                <p className='f6 link grow ba bw1 ph3 pv2 dib black pointer' onClick={() => changeRoute('signIn')}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className='NavBtn mt3 mr3'>
                <p className='f6 link grow ba bw1 ph3 pv2 mh2 dib black pointer' onClick={() => changeRoute('signIn')}>Sign In</p>
                <p className='f6 link grow ba bw1 ph3 pv2 dib black pointer' onClick={() => changeRoute('signUp')}>Sign Up</p>
            </nav>
        );
    }
};

export default Navigation;
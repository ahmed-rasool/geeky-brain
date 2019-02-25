import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return(
        <div className='mb1'>
            <Tilt className="Tilt shadow-2 center" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img className='pt3' src={logo} alt="" />
                    <p className='f5'>Geeky Brain</p>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
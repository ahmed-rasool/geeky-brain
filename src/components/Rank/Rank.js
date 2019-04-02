import React from 'react';

const Rank = ({ currentRoute, currentUser }) => {
    if (currentRoute === 'home') {
        return(
            <div>
                <p className='f4 '>Welcome {currentUser.name}, your current entries are</p>
                <p className='f3 '>{currentUser.entries}</p>
            </div>
        ); 
    } else {
        return null;
    }
};

export default Rank;
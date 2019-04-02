import React from 'react';

const Message = ({ currentRoute, message, userStatus }) => {
    if (currentRoute === 'home') {
        const { statusCode, statusText } = message;
        let toggleDoNotDisplay = 'dn';
        if (statusText === 'Bad Request' && userStatus === true) {
            toggleDoNotDisplay = '';
        } else {
            toggleDoNotDisplay = 'dn'
        }
    
        return(
            <div className='mt3 mb3'>
                  <p className={`f2 ${toggleDoNotDisplay}`}>ERROR {statusCode}</p>
                  <img className={toggleDoNotDisplay} src="https://img.icons8.com/windows/90/000000/sad-cloud.png" alt='' />
                  <p className={`f3 ${toggleDoNotDisplay}`}>{statusText}</p>
            </div>
        );     
    } else {
        return null;
    }

};

export default Message;
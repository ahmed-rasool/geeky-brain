import React from 'react';

const Message = ({ message }) => {
    const { statusCode, statusText } = message;
    let toggleDoNotDisplay = 'dn';
    if (statusText === 'Bad Request') {
        toggleDoNotDisplay = '';
    } else {
        toggleDoNotDisplay = 'dn'
    }
    return(
        <div className='mt3 mb3'>
              <p className={`f2 ${toggleDoNotDisplay}`}>ERROR {statusCode}</p>
              <img className={toggleDoNotDisplay} src="https://img.icons8.com/windows/90/000000/sad-cloud.png" />
              <p className={`f3 ${toggleDoNotDisplay}`}>{statusText}</p>
        </div>
    );
};

export default Message;
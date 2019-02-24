import React from 'react';

const InputForm = ({ onInputUrl, onButtonClick }) => {
    return(
        <div>
            <p className='f5 pa3'>Geeky Brain will detect face on uploaded image.</p>
            <div className='shadow-2 pa4 w-70 center centerCotent'>
                <input className='f5 pa2 w-70 center' type="text" placeholder='Enter URL here' onChange={onInputUrl} />
                <input className='f5 link dim pv2 dib white bg-near-black w-30 center pointer' type="button" name="detectBtn" id="" value='Detect' onClick={onButtonClick} />                
            </div>
        </div>
    );
};

export default InputForm;
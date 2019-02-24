import React from 'react';
import './FaceImage.css';

const FaceImage = ({ imageUrl, faceBox }) => {
    const { toprow, rightcol, bottomrow, leftcol } = faceBox;
    return(
        <div className='mt4 mb4 w-70 center'>
            <div className='relative w-50 center'>
                <img id='result-Image' className='' src={imageUrl} alt="" />
                <div className='bounding-box' style={{top: toprow, right: rightcol, bottom: bottomrow, left: leftcol}}></div>
            </div>
        </div>
    );
};

export default FaceImage;
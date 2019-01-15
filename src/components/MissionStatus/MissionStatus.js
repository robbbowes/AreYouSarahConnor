import React from 'react';

const MissionStatus = ({ located }) => {

    const mission = located === true ? 'TERMINATE TARGET' : 'LOCATE TARGET'

    return (
        <div>
            <p className='f1 barcode pt5'>
                {"UPLOAD IMAGES TO SCAN FOR SARAH CONNOR"}
            </p>
            <div className='red quantico f3 pb2'>
                {mission}
            </div>
        </div>
    );
};

export default MissionStatus;
import React from 'react';

const MissionStatus = ({ location }) => {

    const mission = "MISSION: " + (location !== -1 ? 'TERMINATE TARGET' : 'LOCATE TARGET');

    return (
        <div>
            <p className='white f1 barcode'>
                {"UPLOAD IMAGES TO SCAN FOR SARAH CONNOR"}
            </p>
            <div className='white quantico f3 pb2'>
                {mission}
                <span className='letter5'>_</span>
            </div>
        </div>
    );
};

export default MissionStatus;
import React from 'react';

const MissionStatus = ({ located }) => {

    const mission = located === true ? 'TERMINATE TARGET' : 'LOCATE TARGET' 

    return (
        <div>
            <div className='white f3'>
                {mission}
            </div>
            {/* <div className='white f1'>
                {`${located}`}
            </div> */}
        </div>
    );
};

export default MissionStatus;
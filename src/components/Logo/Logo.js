import React from 'react';
import Fade from 'react-reveal/Fade'
import arnie from './arnie.png'

const Logo = () => {
    return (
        <Fade delay={1000}>
            <div className='ma4 mt0 pointer'>
                <img className='logo' alt='logo' src={arnie} />
            </div>
        </Fade>
    );
};

export default Logo;
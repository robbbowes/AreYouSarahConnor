import React from 'react';
import Fade from 'react-reveal/Fade'
import './Logo.css';
import logoImg from './logo.png'

const Logo = () => {
    return (
        <Fade delay={1000}>
            <div className='ma4 mt0'>
                <img className='logo' alt='logo' src={logoImg} />
            </div>
        </Fade>
    );
};

export default Logo;
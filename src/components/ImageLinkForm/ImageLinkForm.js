import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onHitEnter }) => {
    return (
        <div>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        id='url-input'
                        className='f4 pa2 w-70' 
                        type='text' 
                        onChange={onInputChange}
                        onKeyPress={onHitEnter}
                    />
                    <button 
                        id='submit-button'
                        className='w-30 fade f4 link pv dib white quantico bg-dark-red' 
                        onClick={onButtonSubmit}
                    >
                        <span id='letter1' className='toggle'>S</span>
                        <span id='letter2' className='toggle'>C</span>
                        <span id='letter3' className='toggle'>A</span>
                        <span id='letter4' className='toggle'>N</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
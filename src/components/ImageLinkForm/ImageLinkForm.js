import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        id='url-input'
                        className='f4 pa2 w-70' 
                        type='text' 
                        onChange={onInputChange} 
                    />
                    <button 
                        className='w-30 fade f4 link pv dib white quantico bg-dark-red' 
                        onClick={onButtonSubmit}
                    >
                        SCAN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
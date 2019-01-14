import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f1 barcode'>
                {"Upload images to scan for Sarah Connor"}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange} 
                    />
                    <button 
                        className='w-30 fade f4 link pv dib white bg-dark-red' 
                        onClick={onButtonSubmit}
                    >
                        Scan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
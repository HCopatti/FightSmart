import React from 'react';
import varIcon from './assets/var_icon.png';
import varGif from './assets/var.gif';

import './VarControl.css';

function VarControl({ modoVAR, setModoVAR }) {
    return (
        <>
        <label>
        <div className='var-container' onClick={() => setModoVAR(!modoVAR)}>
        <img src={varIcon} alt='varicon'/>
        {modoVAR && (<div className="var-alerta">⚠️ VAR Ligado ⚠️</div>)}
        </div>
        </label>
        
        {/* <div className='var-gif-container'>
            <img className='var-gif' src={varGif} alt='gif'/>
        </div> */}
        
        </>
    );
}

export default VarControl;
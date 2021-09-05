import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = ({clicked, show}) => {
    return (
        <div className = {[classes.Backdrop, show ? classes.Show : classes.Hide].join(' ')} onClick={clicked}>

        </div>
    )
}

export default Backdrop;
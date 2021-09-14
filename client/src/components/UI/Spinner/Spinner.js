import React from 'react';

import classes from './Spinner.module.css';

const Spinner = ({width, height}) => {
    return (
        <div className={classes.loader} style={{width: width, height: height}}>
            
        </div>
    )
}

export default Spinner;
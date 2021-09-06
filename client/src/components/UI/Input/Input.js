import React from 'react';

import classes from './Input.module.css';

const Input = ({type, value, placeholder, title}) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Title}>{title}</label>
            <input type={type} value={value} 
                placeholder={placeholder}
                className={classes.Field}/>
        </div>
    )
}

export default Input;
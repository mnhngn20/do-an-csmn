import React from 'react';

import classes from './Input.module.css';

const Input = ({type, value, placeholder, title, changed, isValid, message}) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Title}>{title}</label>
            <input type={type} value={value} 
                placeholder={placeholder}
                className={[classes.Field, isValid ? null : classes.isNotValid].join(' ')}
                onChange = {changed}/>
            {isValid ? null : <p className={classes.Message}>{message}</p>}
        </div>
    )
}

export default Input;
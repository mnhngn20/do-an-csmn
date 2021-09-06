import React from 'react';

import classes from './Login.module.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Login = (props) => {
    return (
        <form className={classes.Login}>
            <h1 className={classes.Header}>LOGIN</h1>
            <label className={classes.Title}>Email</label>
            <input className={classes.Input} type="text" />        
            <label className={classes.Title}>Password</label>
            <input className={classes.Input} type="text" />
            <button type="submit" className={classes.BtnSbmt}><ArrowForwardIcon className={classes.Icon}/></button>
        </form>
    )
}

export default Login;
import React from 'react';
import Input from '../../UI/Input/Input';

import classes from './SignUp.module.css';
import Logo from '../../../assets/logo-dark.png'
const SignUp = ({clicked}) => {
    return (
        <div className={classes.SignUp}>
            <form className={classes.Form}>
                <h1>Create an account<span className={classes.SubHeader} onClick={clicked}><br></br>or click here to login</span></h1>
                <Input type="text" title="Name"/>
                <Input type="text" title="Email" />
                <Input type="password" title="Password"/>
                <Input type="password" title="Confirm Password"/>
                <button className={classes.BtnSbmt} type="Submit">SIGN UP</button>
            </form>
            <div className={classes.Welcome}>
                <img src={Logo} alt="logo" className={classes.Logo}/>
                <p className={classes.WelcomeLine}>Connect with other people!</p>
            </div>
        </div>
    )
}

export default SignUp;
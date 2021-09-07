import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input/Input';
import axios from 'axios'

import classes from './SignUp.module.css';
import Logo from '../../../assets/logo-dark.png';
import { updateObject } from '../../../helpers/ultility';

const SignUp = ({clicked}) => {
    const [name, setName] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    });
    const [email, setEmail] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    });
    const [password, setPassword] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    });
    const [canSubmit, setCanSubmit] = useState(false)

    const isEmail = (input) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(input));
    }

    useEffect(()=>{
        if(name.isValid && email.isValid && password.isValid && confirmPassword.isValid){
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    }, [name, email, password, confirmPassword])

    const onInputChange = (e, type) => {
        const newInput = e.target.value;
        switch(type){
            case "name":
                setName(updateObject(name, {
                    value: newInput,
                    isNotTouched: false,
                    isValid: newInput.length > 0
                }));
                break;
            case "email":
                setEmail(updateObject(email, {
                    value: newInput,
                    isNotTouched: false,
                    isValid: isEmail(newInput) && newInput.length > 0
                }));
                break;
            case "password":
                setPassword(updateObject(password, {
                    value: newInput,
                    isNotTouched: false,
                    isValid: newInput.length >= 6
                }));
                break;
            case "confirmPassword":
                setConfirmPassword(updateObject(confirmPassword, {
                    value: newInput,
                    isNotTouched: false,
                    isValid: newInput.length > 0 && newInput === password.value
                }));
                break;  
            default: break;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        axios.post('http://localhost:8800/auth/signup', data).then(()=> {
            console.log("suc sec")
        })

    }

    return (
        <div className={classes.SignUp}>
            <form className={classes.Form} onSubmit={(e) => submitHandler(e)}>
                <h1>Create an account<span className={classes.SubHeader} onClick={clicked}><br></br>or click here to login</span></h1>
                <Input 
                    type="text" 
                    title="Name" 
                    value={name.value} 
                    changed={e => onInputChange(e,"name")}
                    isValid={name.isValid || name.isNotTouched}
                    message="Name is required."/>
                <Input 
                    type="text" 
                    title="Email" 
                    value={email.value} 
                    changed={e => onInputChange(e,"email")}
                    isValid={email.isValid || email.isNotTouched}
                    message="Your email must be valid."/>
                <Input 
                    type="password" 
                    title="Password" 
                    value={password.value} 
                    changed={e => onInputChange(e,"password")}
                    isValid={password.isValid || password.isNotTouched}
                    message="Your password must contains at least 6 letters."/>
                <Input 
                    type="password" 
                    title="Confirm Password" 
                    value={confirmPassword.value} 
                    changed={e => onInputChange(e,"confirmPassword")}
                    isValid={confirmPassword.isValid || confirmPassword.isNotTouched}
                    message="Your password doesn't match."/>
                <button className={[classes.BtnSbmt, canSubmit ? null : classes.Cantsbmt].join(' ')} type="Submit"
                    disabled={canSubmit ? false : true}>SIGN UP</button>
            </form>
            <div className={classes.Welcome}>
                <img src={Logo} alt="logo" className={classes.Logo}/>
                <p className={classes.WelcomeLine}>Connect with other people!</p>
            </div>
        </div>
    )
}

export default SignUp;
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './SignUp.module.css';

import Input from '../../UI/Input/Input';
import * as actions from '../../../redux/actions/index'
import Logo from '../../../assets/logo-dark.png';
import { updateObject } from '../../../helpers/ultility';
import Modal from '../../UI/Modal/Modal';

const SignUp = ({clicked, loading, error, signUp}) => {
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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

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

    useEffect(()=>{
        if(isSubmitted && error && !loading){
            setShowError(true)
        } else if(isSubmitted && !error && !loading){
            setShowSuccess(true)
        }
    }, [error, loading, isSubmitted])

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
        signUp(data);
        setIsSubmitted(true)
    }

    const hideModal = () =>{
        setShowError(false);
        setShowSuccess(false);
    }

    return (
        <div className={classes.SignUp}>
            <Modal 
                show={showSuccess} 
                modalType="Success"
                modalClosed={hideModal}>
                <p>Signed Up Successful</p>
            </Modal>
            <Modal 
                show={showError} 
                modalType="Error" 
                modalClosed={hideModal}>
                <p>Email is already existed.</p>
            </Modal>
            <form className={classes.Form} onSubmit={(e) => submitHandler(e)}>
                <h1>Create an account<p className={classes.SubHeader} onClick={clicked}><br></br>or click here to login</p></h1>
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
                    disabled={!canSubmit}>SIGN UP</button>
            </form>
            <div className={classes.Welcome}>
                <img src={Logo} alt="logo" className={classes.Logo}/>
                <p className={classes.WelcomeLine}>Connect with other people!</p>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
    }
}

const mapDispatch = (dispatch) => {
    return {
        signUp: (data) => dispatch(actions.register(data))
    }
}

export default connect(mapState, mapDispatch)(SignUp);
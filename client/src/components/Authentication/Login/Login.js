import React, { useState, useEffect } from 'react';
import * as actions from '../../../redux/actions/index';
import { connect } from 'react-redux';

import classes from './Login.module.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { updateObject } from '../../../helpers/ultility';
import Modal from '../../UI/Modal/Modal';
import { Link } from 'react-router-dom';

const Login = ({error, loading, login}) => {
    const [email, setEmail] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    })
    const [password, setPassword] = useState({
        value: '',
        isValid: false,
        isNotTouched: true
    })
    const [canSubmit, setCanSubmit] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const isEmail = (input) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(input));
    }

    useEffect(() => {
        if(email.isValid && password.isValid){
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [email, password])

    useEffect(()=>{
        if(isSubmitted && error && !loading){
            setShowError(true)
        } else if(isSubmitted && !error && !loading){
            setShowSuccess(true)
        }
    }, [error, loading, isSubmitted])

    const onInputChange = (event, type) => {
        event.preventDefault();
        const newInput = event.target.value;
        switch(type){
            case "email":
                setEmail(updateObject(email, {
                    value: newInput,
                    isValid: isEmail(newInput) && newInput.length > 0,
                    isNotTouched: false
                }))
                break;
            case "password":
                setPassword(updateObject(password, {
                    value: newInput,
                    isValid: newInput.length >= 6,
                    isNotTouched: false
                }))
                break;
            default: break;
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const data = {
            email: email.value,
            password: password.value
        }
        login(data);
        setIsSubmitted(true)
    }

    const hideModal = () =>{
        setShowError(false);
        setShowSuccess(false);
    }

    return (
        <form className={classes.Login} onSubmit={e => submitHandler(e)}>
            <Modal 
                show={showSuccess} 
                modalType="Success"
                modalClosed={hideModal}>
                <p>Login Successful</p>
            </Modal>
            <Modal 
                show={showError} 
                modalType="Error" 
                modalClosed={hideModal}>
                <p>Invalid email or password.</p>
            </Modal>
            <h1 className={classes.Header}>LOGIN</h1>
            <label className={classes.Title}>Email</label>
            <input 
                className={[classes.Input, email.isValid || email.isNotTouched ? null : classes.isNotValid].join(' ')} 
                type="text" 
                onChange={e => onInputChange(e, "email")}
                value = {email.value}/>        
            <label className={classes.Title}>Password</label>
            <input 
                className={[classes.Input, password.isValid || password.isNotTouched ? null : classes.isNotValid].join(' ')} 
                type="password" 
                onChange={e => onInputChange(e, "password")}
                value = {password.value}/>
            <button 
                type="submit" 
                className={[classes.BtnSbmt, canSubmit ? null : classes.Cantsbmt].join(' ')}
                disabled={!canSubmit}><ArrowForwardIcon className={classes.Icon}/></button>
            <div className={classes.MobileOnly}>
                <Link to='/signup'>Create an account</Link>
            </div>
        </form>
    )
}

const mapState = state => ({
    loading: state.authReducer.loading,
    error: state.authReducer.error
})

const mapDispatch = dispatch => ({
    login: (data) => dispatch(actions.auth(data))
})

export default connect(mapState, mapDispatch)(Login);
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions/index';

import classes from './Messenger.module.css';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CircularProgress from '@material-ui/core/CircularProgress';

const Messenger = ({conversationId, send, sendMessageLoading}) => {
    const [message, setMessage] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        message !== "" ? setCanSubmit(true) : setCanSubmit(false)
    }, [message])

    const onChangeInput = (e) => {
        setMessage(e.target.value)
    }   

    const submitMessage = (e, conversationId, message) => {
        e.preventDefault();
        setMessage('');
        send(conversationId, message)
    }

    return (
        <form className = {classes.Messenger} onSubmit={canSubmit ? (e) => submitMessage(e, conversationId, message) : null}>
            <input className={classes.Input} value={message} onChange={e => onChangeInput(e)}/>
            <button type="submit" className={classes.SubmitBtnContainer} disabled={!canSubmit}>
                { 
                sendMessageLoading 
                ? <CircularProgress className={classes.Spinner} />
                : <KeyboardReturnIcon className={[classes.SubmitBtn, canSubmit ? null : classes.cantSubmit]}/>
                }
            </button>
        </form>
    )
}

const mapDispatch = dispatch => {
    return {
        send: (conversationId, message) => dispatch(actions.send(conversationId, message))
    }
}

export default connect(null, mapDispatch)(Messenger);
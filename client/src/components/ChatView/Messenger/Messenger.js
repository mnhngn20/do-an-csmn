import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions/index';

import classes from './Messenger.module.css';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CircularProgress from '@material-ui/core/CircularProgress';

const Messenger = ({conversationId, send, sendMessageLoading, socket, receiverUser}) => {
    const [message, setMessage] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        message !== "" ? setCanSubmit(true) : setCanSubmit(false)
    }, [message])

    const onChangeInput = (e) => {
        setMessage(e.target.value)
    }   

    const submitMessage = (e, conversationId, message, socket, receiverId) => {
        e.preventDefault();
        setMessage('');
        console.log(socket)
        send(conversationId, message, socket, receiverId);
    }

    return (
        <form className = {classes.Messenger} onSubmit={canSubmit ? (e) => submitMessage(e, conversationId, message, socket, receiverUser._id) : null}>
            <input className={classes.Input} value={message} onChange={e => onChangeInput(e)}/>
            <button type="submit" className={classes.SubmitBtnContainer} disabled={!canSubmit}>
                { 
                sendMessageLoading 
                ? <CircularProgress className={classes.Spinner} />
                : <KeyboardReturnIcon className={[classes.SubmitBtn, canSubmit ? null : classes.cantSubmit].join(' ')}/>
                }
            </button>
        </form>
    )
}

const mapState = state => {
    return {
        socket: state.socketReducer.socket
    }
}

const mapDispatch = dispatch => {
    return {
        send: (conversationId, message, socket, receiverId) => dispatch(actions.send(conversationId, message, socket, receiverId))
    }
}

export default connect(mapState, mapDispatch)(Messenger);
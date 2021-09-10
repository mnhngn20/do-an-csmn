import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions/index';

import classes from './Messenger.module.css';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const Messenger = ({conversationId, send}) => {
    const [message, setMessage] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        message !== "" ? setCanSubmit(true) : setCanSubmit(false)
    }, [message])

    const onChangeInput = (e) => {
        setMessage(e.target.value)
    }   

    const submitMessage = (conversationId, message) => {
        setMessage('');
        send(conversationId, message)
    }

    return (
        <div className = {classes.Messenger}>
            <textarea className={classes.Input} maxlength="2024" value={message} onChange={e => onChangeInput(e)}/>
            <KeyboardReturnIcon className={[classes.SubmitBtn, canSubmit ? null : classes.cantSubmit]} onClick={canSubmit ? () => submitMessage(conversationId, message) : null}/>
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        send: (conversationId, message) => dispatch(actions.send(conversationId, message))
    }
}

export default connect(null, mapDispatch)(Messenger);
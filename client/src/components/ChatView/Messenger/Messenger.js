import React from 'react';

import classes from './Messenger.module.css';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
const Messenger = (props) => {
    return (
        <div className = {classes.Messenger}>
            <textarea className={classes.Input} maxlength="2024"/>
            <KeyboardReturnIcon className={classes.SubmitBtn} />
        </div>
    )
}

export default Messenger;
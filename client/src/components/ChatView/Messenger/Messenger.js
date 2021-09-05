import React from 'react';

import classes from './Messenger.module.css';
import SendIcon from '@material-ui/icons/Send';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
const Messenger = (props) => {
    return (
        <div className = {classes.Messenger}>
            <input type="text" className={classes.Input}/>
            <KeyboardReturnIcon className={classes.SubmitBtn} />
        </div>
    )
}

export default Messenger;
import React from 'react';

import classes from './Message.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
const Message = ({isSender}) => {
    return (
        <div className={classes.Container}>
            <div className={[classes.Message, isSender ? classes.senderMessage : ""].join(' ')}>
                <div className={[classes.Top, isSender ? classes.senderTop : ""].join(' ')}>
                    <ProfilePicture online />
                    <p className={[classes.TextBox, isSender ? classes.senderTextBox : classes.receiverTextBox].join(' ')}>Hello Brotha!</p>
                </div>
                <p className={classes.Time}>Just now</p>
            </div>
        </div>
        
    )
}

export default Message;
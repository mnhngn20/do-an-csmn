import React from 'react';

import classes from './Message.module.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
const Message = ({isSender, message}) => {
    return (
        <div className={classes.Container}>
            <div className={[classes.Message, isSender ? classes.senderMessage : ""].join(' ')}>
                <div className={[classes.Top, isSender ? classes.senderTop : ""].join(' ')}>
                    <ProfilePicture online />
                    <p className={[classes.TextBox, isSender ? classes.senderTextBox : classes.receiverTextBox].join(' ')}>
                        {message.text}
                    </p>
                </div>
                <p className={classes.Time}>{message.createdAt}</p>
            </div>
        </div>
        
    )
}

export default Message;
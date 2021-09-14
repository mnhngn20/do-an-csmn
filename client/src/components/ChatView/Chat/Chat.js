import React, {useEffect, useRef} from 'react';
import Message from '../Message/Message';

import classes from './Chat.module.css';

const Chat = ({messages, userData}) => {
    const chatRef = useRef();
    useEffect(()=> {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [messages])
    let m = messages.length === 0 
        ? <p className={classes.Begin}>Let's start your conversation!</p> 
        : messages.map(message => <Message key={message._id} message={message} isSender={message.senderId === userData._id}/>)
    return (
        <div className={classes.Chat} ref={chatRef}>
            {m}
        </div>
    )
}

export default Chat;
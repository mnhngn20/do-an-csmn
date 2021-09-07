import React, {useEffect, useRef} from 'react';
import Message from '../Message/Message';

import classes from './Chat.module.css';

const Chat = (props) => {
    const chatRef = useRef();
    
    useEffect(()=> {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [])

    return (
        <div className={classes.Chat} ref={chatRef}>
            <Message />
            <Message />
            <Message isSender/>
            <Message isSender/>
            <Message />
            <Message />
            <Message />
            <Message isSender/>

        </div>
    )
}

export default Chat;
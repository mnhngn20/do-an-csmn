import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';

import classes from './Chat.module.css';

const Chat = ({messages, userData}) => {
    const chatRef = useRef();
    useEffect(()=> {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [messages])
    let m = messages.length === 0 
        ? <p className={classes.Begin}>Let's start your conversation!</p> 
        : messages.map(message => <Message message={message} isSender={message.senderId === userData._id}/>)

    return (
        <div className={classes.Chat} ref={chatRef}>
            {m}
        </div>
    )
}

const mapState = (state) => {
    return {
        messages: state.conversationReducer.messages,
        userData: state.authReducer.userData
    }
}

export default connect(mapState)(Chat);
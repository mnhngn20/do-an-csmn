import React from 'react';
import classes from './ChatView.module.css';

import Chat from './Chat/Chat';
import Messenger from './Messenger/Messenger';
import Info from './Info/Info';
import Auxi from '../../helpers/Auxi/Auxi';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Spinner from '../UI/Spinner/Spinner';

const ChatView = ({conversationId, goBack, messages, userData, loadingConversation, sendMessageLoading, receiverUser}) => {
    let view = loadingConversation ? <div className={classes.Spinner}><Spinner width="1em" height="1em"/></div> :
    conversationId ?
        <Auxi>
            <Info goBack={goBack} receiverUser={receiverUser}/>
            <Chat messages={messages} userData={userData} sendMessageLoading={sendMessageLoading}/>
            <Messenger conversationId={conversationId} sendMessageLoading={sendMessageLoading} receiverUser={receiverUser}/>
        </Auxi>
        : <Auxi>
            <SentimentVerySatisfiedIcon className={classes.Smile}/>
            <p className={classes.Intro}>Let's find someone to talk, have a goodtime!!! XD XD</p>
        </Auxi>
    return (
        <div className = {[classes.ChatView, !conversationId ? classes.Centered : null].join(' ')}>
            {view}
        </div>
    )
}

export default ChatView;
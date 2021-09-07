import React from 'react';

import classes from './ChatView.module.css';

import Chat from './Chat/Chat';
import Messenger from './Messenger/Messenger';
import Info from './Info/Info';
import Auxi from '../../helpers/Auxi/Auxi';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const ChatView = ({isOnConversation, goBack}) => {
    let view = isOnConversation ?
        <Auxi>
            <Info goBack={goBack}/>
            <Chat />
            <Messenger />
        </Auxi>
        : <Auxi>
            <SentimentVerySatisfiedIcon className={classes.Smile}/>
            <p className={classes.Intro}>Let's find someone to talk, have a goodtime!!! XD XD</p>
        </Auxi>
    return (
        <div className = {[classes.ChatView, !isOnConversation ? classes.Centered : null].join(' ')}>
            {view}
        </div>
    )
}

export default ChatView;
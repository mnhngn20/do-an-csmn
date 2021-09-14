import React, {useState, useEffect, useRef, useMemo} from 'react';
import {connect} from 'react-redux'

import Auxi from '../../helpers/Auxi/Auxi';
import Social from '../Social/Social';
import ChatView from '../ChatView/ChatView';
import classes from './Main.module.css';

const Main = ({conversationId, messages, userData, loadingConversation, sendMessageLoading, receiverUser}) => {
    const [isOnConversation, setIsOnConversation] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const container = useRef()
    const toggleConversation = () => {
        setIsOnConversation(true);
    }
    useEffect(() => {
        setTimeout(function(){
            setIsLoaded(true)
        },500);
    }, []);

    const social = useMemo(() => {
        return <Social setConversation={toggleConversation} userData={userData}/>
    }, [toggleConversation])

    const chatView = useMemo(() => {
        return <ChatView conversationId={conversationId} goBack={()=>setIsOnConversation(false)}
                        messages={messages} userData={userData} loadingConversation={loadingConversation} sendMessageLoading={sendMessageLoading}
                        receiverUser={receiverUser}/>
    }, [messages, userData, loadingConversation, sendMessageLoading, receiverUser])

    return (
        <Auxi>
            <div className = {[classes.Container, isLoaded ? null :classes.preload].join(' ')} ref={container}>
                <div className = {classes.Left}>
                    {social}
                </div>
                <div className = {[classes.Right, isOnConversation ? classes.Show : classes.Hide].join(' ')}>
                    {chatView}
                </div>
                <div className = {classes.Social}>
                    {social}
                </div>
                <div className = {[classes.ChatView, isOnConversation ? classes.Show : classes.Hide].join(' ')}>
                    {chatView}
                </div>
            </div>
        </Auxi>
    )
}

const mapState = (state) => {
    return {
        conversationId: state.conversationReducer.conversationId,
        messages: state.conversationReducer.messages,
        userData: state.authReducer.userData,
        loadingConversation: state.conversationReducer.loading,
        sendMessageLoading: state.conversationReducer.sendMessageLoading,
        receiverUser: state.conversationReducer.receiverUser
    }
}

export default connect(mapState)(Main);
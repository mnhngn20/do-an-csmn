import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../../redux/actions/index'
import classes from './ConversationSettings.module.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ConversationSettings = ({deleteConversation, conversationId}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const removeConversation = (id) => {
        deleteConversation(id);
        setShowOptions(false)
    }
    useEffect(() => {
        setTimeout(function(){
            setIsLoaded(true)
        },500);
    }, []);
    return (
        <div className={[classes.ConversationSettings, isLoaded ? null : classes.preload].join(' ')}>
            <MoreHorizIcon className={classes.Settings} onClick={()=>setShowOptions(!showOptions)}/>
            <div className={[classes.Options, showOptions ? classes.Show : classes.Hide].join(' ')}>
                <p className={classes.Option} onClick={() => removeConversation(conversationId)}>Delete Conversation</p>
                <p className={classes.Option}>Block this person</p>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        conversationId: state.conversationReducer.conversationId
    }
}

const mapDispatch = dispatch => {
    return {
        deleteConversation: (id) => dispatch(actions.deleteConversation(id))
    }
}

export default connect(mapState, mapDispatch)(ConversationSettings);
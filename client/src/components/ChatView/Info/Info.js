import React from 'react';
import {connect} from 'react-redux'

import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import classes from './Info.module.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ConversationSettings from './ConversationSettings/ConversationSettings';

const Info = ({goBack, receiverUser}) => {
    return (
        <div className={classes.Info}>
            <div className={classes.Profile}>
                <div className={classes.MobileOnly}>
                    <ArrowBackIosIcon className={classes.BackIcon} onClick={goBack}/>
                </div>
                <ProfilePicture isOnList/>  
            </div>
            <h1 className={classes.Name}>{receiverUser.name}</h1>
            <ConversationSettings />
        </div>
    )
}

const mapState = state => {
    return {
        receiverUser: state.conversationReducer.receiverUser
    }
}

export default connect(mapState)(Info);
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';

import classes from './Friend.module.css';
import ProfilePicture from '../../../ProfilePicture/ProfilePicture';

const Friend = ({user, getConversation, clicked}) => {
    const setConversation = (id) => {
        getConversation(id)
        clicked();
    }
    return (
        <div className={[classes.Friend, user.online ? classes.onlineFriend : ""].join(' ')} 
            onClick={() => setConversation(user._id)}>
            <ProfilePicture online={user.online} isOnList/>
            <div className={[classes.Info, user.online ? classes.onlineInfo : "" ].join(' ')}>
                <p className={classes.Name}>{user.name}</p>
                <p className={classes.Email}>{user.email}</p>
            </div>
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        getConversation: (id) => dispatch(actions.getConversation(id))
    }
}

export default connect(null, mapDispatch)(Friend);
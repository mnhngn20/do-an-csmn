import React, { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';

import classes from './Friend.module.css';
import ProfilePicture from '../../../ProfilePicture/ProfilePicture';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const Friend = ({userId, getConversation, clicked, receiverUser, onlineUsers}) => {
    const [displayUser, setDisplayUser] = useState(null);
    const [isOnline, setIsOnline] = useState(false)
    useEffect(() => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8800/users/user/' + userId, config).then(res => {
            const fetchedUser = {
                ...res.data,
                online: true
            }
            setDisplayUser(fetchedUser);
        }).catch(err => {
            console.log(err)
        })
    }, [userId])

    useEffect(()=> {
        setIsOnline(onlineUsers.some(user => user.userId === userId));
    }, [onlineUsers])

    const setConversation = (id) => {
        getConversation(id)
        clicked();
    }
    return (
        !displayUser ? 
        <div className={[classes.Friend, classes.onlineFriend].join(' ')}><CircularProgress className={classes.Spinner}/></div>
        : <div className={[classes.Friend, isOnline ? classes.onlineFriend : null].join(' ')} 
            onClick={receiverUser 
                ? receiverUser._id === displayUser._id 
                ? clicked  
                : () => setConversation(displayUser._id) 
                : () => setConversation(displayUser._id)}>
            <ProfilePicture online={isOnline} isOnList/>
            <div className={[classes.Info, isOnline ? classes.onlineInfo : null ].join(' ')}>
                <p className={classes.Name}>{displayUser.name}</p>
                <p className={classes.Email}>{displayUser.email}</p>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        receiverUser: state.conversationReducer.receiverUser
    }
}

const mapDispatch = dispatch => {
    return {
        getConversation: (id) => dispatch(actions.getConversation(id))
    }
}

export default connect(mapState, mapDispatch)(Friend);
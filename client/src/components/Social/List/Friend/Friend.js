import React, { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';

import classes from './Friend.module.css';
import ProfilePicture from '../../../ProfilePicture/ProfilePicture';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const Friend = ({userId, getConversation, clicked, receiverUser}) => {
    const [user, setUser] = useState(null);
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
            setUser(fetchedUser);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const setConversation = (id) => {
        getConversation(id)
        clicked();
    }
    return (
        !user ? 
        <div className={[classes.Friend, classes.onlineFriend].join(' ')}><CircularProgress className={classes.Spinner}/></div>
        : <div className={[classes.Friend, user.online ? classes.onlineFriend : null].join(' ')} 
            onClick={receiverUser 
                ? receiverUser._id === user._id 
                ? clicked  
                : () => setConversation(user._id) 
                : () => setConversation(user._id)}>
            <ProfilePicture online={user.online} isOnList/>
            <div className={[classes.Info, user.online ? classes.onlineInfo : null ].join(' ')}>
                <p className={classes.Name}>{user.name}</p>
                <p className={classes.Email}>{user.email}</p>
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
import React from 'react';


import classes from './Friend.module.css';
import ProfilePicture from '../../../ProfilePicture/ProfilePicture';

const Friend = ({online, clicked}) => {
    return (
        <div className={[classes.Friend, online ? classes.onlineFriend : ""].join(' ')} onClick={clicked}>
            <ProfilePicture online isOnList/>
            <div className={[classes.Info, online ? classes.onlineInfo : "" ].join(' ')}>
                <p className={classes.Name}>Minh Nguyen</p>
                <p className={classes.Email}>mnhngn20@gmail.com</p>
            </div>
        </div>
    )
}

export default Friend;
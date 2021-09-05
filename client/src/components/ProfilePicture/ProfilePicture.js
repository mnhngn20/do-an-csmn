import React from 'react';

import classes from './ProfilePicture.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ProfilePicture = ({online, isOnList}) => {
    return (
        <div className = {classes.ProfilePicture}>
            <AccountCircleIcon className={[classes.Profile, isOnList ? classes.listProfilePicture : null].join(' ')} />
            {online ? <div className={[classes.dot, isOnList ? classes.listDot : null].join(' ')}></div> : null}
        </div>
    )
}

export default ProfilePicture;
import React, {useEffect} from 'react';

import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import classes from './Info.module.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ConversationSettings from './ConversationSettings/ConversationSettings';

const Info = ({goBack, receiverUser}) => {
    useEffect(() => {
        console.log(receiverUser)
    })
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

export default Info;
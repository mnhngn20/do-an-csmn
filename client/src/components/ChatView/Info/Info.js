import React from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import classes from './Info.module.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const Info = ({goBack}) => {
    return (
        <div className={classes.Info}>

            <div className={classes.Profile}>
                <ArrowBackIosIcon className={classes.BackIcon} onClick={goBack}/>
                <ProfilePicture isOnList/>  
            </div>
            <h1 className={classes.Name}>Name</h1>
            <MoreHorizIcon className={classes.Settings}/>
        </div>
    )
}

export default Info;
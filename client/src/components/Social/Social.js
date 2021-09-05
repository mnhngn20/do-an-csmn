import React, {useState} from 'react';
import List from './List/List';

import classes from './Social.module.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
const Social = ({setConversation}) => {
    const [showConnected, setShowConnected] = useState(false);
    const [showOnline, setShowOnline] = useState(false);

    const toggleShowOnline = () => {
        setShowOnline(!showOnline);
    }

    const toggleShowConnected = () => {
        setShowConnected(!showConnected);
    }

    return (
        <div className={classes.Social}>
            <div className={classes.List}>
                <h1>Online Friends</h1>
                {   
                    !showOnline ?
                    <ArrowDropDownIcon className={classes.Dropdown} onClick={toggleShowOnline}/>
                    : <ArrowDropUpIcon className={classes.Dropdown} onClick={toggleShowOnline}/>
                }
            </div>
            <List clicked = {setConversation} show={showOnline}/>
            <br></br>
            <div className={classes.List}>
                <h1>Connected Friends</h1>
                {   
                    !showConnected ?
                    <ArrowDropDownIcon className={classes.Dropdown} onClick={toggleShowConnected}/>
                    : <ArrowDropUpIcon className={classes.Dropdown} onClick={toggleShowConnected}/>
                }
            </div>
            <List clicked = {setConversation} show={showConnected}/>
        </div>
    )
}

export default Social;
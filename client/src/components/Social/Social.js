import React, {useEffect, useState, useMemo} from 'react';
import List from './List/List';
import { connect } from 'react-redux';

import classes from './Social.module.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const Social = ({setConversation, onlineUsers, userData}) => {
    const [showConnected, setShowConnected] = useState(false);
    const [showOnline, setShowOnline] = useState(false);

    const toggleShowOnline = () => {
        setShowOnline(!showOnline);
    }

    const toggleShowConnected = () => {
        setShowConnected(!showConnected);
    }

    const list = useMemo(() => {
        return <List clicked = {setConversation} show={showConnected} users={onlineUsers} userData={userData}/>
    }, [onlineUsers, setConversation])
    return (
        <div className={classes.Social}>
            <div className={classes.List}>
                <h1 onClick={toggleShowOnline}>Online Friends</h1>
                {   
                    !showOnline ?
                    <ArrowDropDownIcon className={classes.Dropdown} onClick={toggleShowOnline}/>
                    : <ArrowDropUpIcon className={classes.Dropdown} onClick={toggleShowOnline}/>
                }
            </div>
            <List clicked = {setConversation} show={showOnline} users={onlineUsers} userData={userData}/>
            <br></br>
            <div className={classes.List}>
                <h1 onClick={toggleShowConnected}>Connected Friends</h1>
                {   
                    !showConnected ?
                    <ArrowDropDownIcon className={classes.Dropdown} onClick={toggleShowConnected}/>
                    : <ArrowDropUpIcon className={classes.Dropdown} onClick={toggleShowConnected}/>
                }
            </div>
            <List clicked = {setConversation} show={showConnected} users={onlineUsers} userData={userData}/>

        </div>
    )
}

const mapState = (state) => {
    return {
        onlineUsers: state.socketReducer.onlineUsers,
    }
}

export default connect(mapState, null)(Social);
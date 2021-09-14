import React from 'react';
import Friend from './Friend/Friend';

import classes from './List.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const List = ({clicked, show, onlineUsers, users, userData, loading}) => {
    let list = users.length === 1 
        ? <p className={classes.NoOnline}>No one is online right now</p>
        : users.map(user => {
            if(user.userId){
                if(user.userId !== userData._id)
                return <Friend clicked={clicked} key={user.userId} userId={user.userId} onlineUsers={onlineUsers}/>
            } else {
                if(user._id !== userData._id)
                return <Friend clicked={clicked} key={user.userId} userId={user._id} onlineUsers={onlineUsers}/>
            }
            
        });
    
    return (
        <div className={[classes.List, show ? classes.Show : classes.Hide].join(' ')}>
            {loading ? <CircularProgress className={classes.Spinner}/> : list}
        </div>
    )
}

export default List;
import React from 'react';
import Friend from './Friend/Friend';

import classes from './List.module.css';

const List = ({clicked, show, users, userData}) => {
    let list = users.length === 1 ? <p className={classes.NoOnline}>No one is online right now</p> : users.map(user => {
        if(user.userId !== userData._id)
        return <Friend clicked={clicked} key={user.userId} userId={user.userId}/>
    })
    return (
        <div className={[classes.List, show ? classes.Show : classes.Hide].join(' ')}>
            {list}
        </div>
    )
}

export default List;
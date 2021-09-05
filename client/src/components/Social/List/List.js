import React from 'react';
import Friend from './Friend/Friend';

import classes from './List.module.css';

const List = ({clicked, show}) => {
    return (
        <div className={[classes.List, show ? classes.Show : classes.Hide].join(' ')}>
            <Friend online clicked={clicked}/>
            <Friend clicked={clicked}/>
            <Friend clicked={clicked}/>
            <Friend clicked={clicked}/>
            <Friend online clicked={clicked}/>
            <Friend online clicked={clicked}/>
            <Friend online clicked={clicked}/>
            <Friend online clicked={clicked}/>
            <Friend online clicked={clicked}/>
        </div>
    )
}

export default List;
import React from 'react';
import Friend from './Friend/Friend';

import classes from './List.module.css';

const List = ({clicked, show}) => {
    let user = {
        name: "Minh Nguyen 2",
        _id: "61381d738cf58403ecc3ff0e",
        email: "minh.quang20@gmail.com",
        online: true
    }
    return (
        <div className={[classes.List, show ? classes.Show : classes.Hide].join(' ')}>
            <Friend clicked={clicked} user={user}/>
            
        </div>
    )
}

export default List;
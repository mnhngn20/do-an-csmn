import React from 'react';

import classes from './Items.module.css';

import Item from './item/item';

const Items = props => {
    return (
        <div className = {classes.Items}>
            <Item link="/">HOME</Item>
            <Item link="/signup">SIGN UP</Item>
            <Item link="/signin">SIGN IN</Item>
        </div>
    )
}

export default Items;
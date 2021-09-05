import React from 'react';

import classes from './Items.module.css';

import Item from './item/item';

const Items = props => {
    return (
        <div className = {classes.Items}>
            <Item>HOME</Item>
            <Item>USER</Item>
        </div>
    )
}

export default Items;
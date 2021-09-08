import React from 'react';

import classes from './item.module.css';

const Item = ({children, clicked, title}) => {
    return (
        <div className={classes.Item} onClick={clicked}>
                {children}
            {
                title ?
                <p className={classes.Subtitle}>{title}</p>
                : null
            }
        </div>
    )
}

export default Item;
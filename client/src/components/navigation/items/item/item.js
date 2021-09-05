import React from 'react';

import classes from './item.module.css';

const Item = ({children}) => {
    return (
        <div className={classes.Item}>
            <p className={classes.Title}>
                {children}
            </p>
        </div>
    )
}

export default Item;
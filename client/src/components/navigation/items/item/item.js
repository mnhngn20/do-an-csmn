import React from 'react';
import { Link } from 'react-router-dom';

import classes from './item.module.css';

const Item = ({children, link}) => {
    return (
        <Link to={link}>
            <div className={classes.Item}>
                <p className={classes.Title}>
                    {children}
                </p>
            </div>
        </Link>
    )
}

export default Item;
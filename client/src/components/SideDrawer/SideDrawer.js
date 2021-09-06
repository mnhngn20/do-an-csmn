import React from 'react';
import Auxi from '../../helpers/Auxi/Auxi';
import Social from '../Social/Social';
import Backdrop from './Backdrop/Backdrop';
import Logo from '../../assets/logo.png';

import classes from './SideDrawer.module.css';
import Items from '../navigation/items/Items';

const SideDrawer = ({show, clicked}) => {
    return (
        <Auxi>
            <Backdrop clicked={clicked} show={show}/>
            <div className = {[classes.SideDrawer, show ? classes.Show : classes.Hide].join(' ')}>
                <img src = {Logo} className={classes.Logo} alt="Logo" />
                <Items />
            </div>
        </Auxi>
    )
}

export default SideDrawer;
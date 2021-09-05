import React from 'react';

import classes from './Navigation.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../assets/logo.png';

import Items from './items/Items';

const Navigation = ({clicked}) => {
    return (
        <div className={classes.NavBar}>
            <img src={Logo} alt="Logo" className = {classes.Logo}/>
            <MenuIcon className = {[classes.Logo, classes.MobileOnly].join(' ')} onClick={clicked}/>
            <Items />
        </div>
    )
}

export default Navigation;
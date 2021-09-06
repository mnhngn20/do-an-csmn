import React from 'react';

import classes from './Navigation.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../assets/logo.png';

import Items from './items/Items';

const Navigation = ({clicked}) => {
    const screenWidth = window.innerWidth
    return (
        <div className={classes.NavBar}>
            <div className={classes.Container}>
                <img src={Logo} alt="Logo" className = {classes.Logo}/>
                <MenuIcon className = {[classes.Logo, classes.MobileOnly].join(' ')} onClick={clicked}/>
                <div className={classes.DesktopOnly}>
                    <Items />
                </div>
            </div>
            
        </div>
    )
}

export default Navigation;
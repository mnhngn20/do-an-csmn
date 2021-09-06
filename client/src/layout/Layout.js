import React, {useEffect, useState} from 'react';

import Navigation from '../components/navigation/Navigation';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Auxi from '../helpers/Auxi/Auxi';

import classes from './Layout.module.css';

const Layout = ({children}) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    
    return (
        <Auxi>
            <SideDrawer show = {showSideDrawer} clicked={toggleSideDrawer}/>
            <div className = {classes.Layout}>
                <Navigation clicked={toggleSideDrawer}/>
                <div className = {classes.Body}>
                    {children}
                </div>
            </div>
        </Auxi>
        
    )
}

export default Layout;
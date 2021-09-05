import React, {useEffect, useState} from 'react';

import ChatView from '../components/ChatView/ChatView';
import Navigation from '../components/navigation/Navigation';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Social from '../components/Social/Social';
import Auxi from '../helpers/Auxi/Auxi';

import classes from './Layout.module.css';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [isOnConversation, setIsOnConversation] = useState(false);
    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    const toggleConversation = () => {
        setIsOnConversation(true);
        console.log(isOnConversation);
    }
    return (
        <Auxi>
            <SideDrawer show = {showSideDrawer} clicked={toggleSideDrawer}/>
            <div className = {classes.Layout}>
                <Navigation clicked={toggleSideDrawer}/>
                <div className = {classes.Body}>
                    <div className = {classes.Container}>
                        <div className = {classes.Left}>
                            <Social setConversation={toggleConversation}/>
                        </div>
                        <div className = {[classes.Right, isOnConversation ? classes.Show : classes.Hide].join(' ')}>
                            <ChatView isOnConversation={isOnConversation} goBack={()=>setIsOnConversation(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </Auxi>
        
    )
}

export default Layout;
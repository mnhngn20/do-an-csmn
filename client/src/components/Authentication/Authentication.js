import React, {useState} from 'react';
import Auxi from '../../helpers/Auxi/Auxi';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import classes from './Authentication.module.css'
const Authentication = props => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <Auxi>
            <div className={classes.DesktopOnly}>
                <SignUp />
            </div>
            <div className={classes.MobileOnly}>
            {
                showLogin 
                ? <Login clicked={() => setShowLogin(false)}/>
                : <SignUp clicked={() => setShowLogin(true)}/>
            }
            </div>
            
        </Auxi>
    )
} 

export default Authentication
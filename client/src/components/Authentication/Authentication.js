import React from 'react';
import { connect } from 'react-redux';
import Auxi from '../../helpers/Auxi/Auxi';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import classes from './Authentication.module.css';
import * as actions from '../../redux/actions/index';

const Authentication = ({showLogin, setShowLogin}) => {
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

const mapState = (state) => {
    return {
        showLogin: state.authReducer.showLogin
    }
}

const mapDispatch = (dispatch) => {
    return {
        setShowLogin: (value) => dispatch(actions.showLogin(value))
    }
}

export default connect(mapState, mapDispatch)(Authentication)
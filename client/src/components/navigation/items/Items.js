import React from 'react';
import { connect } from 'react-redux'; 
import classes from './Items.module.css';
import { NavLink } from 'react-router-dom';

import * as actions from '../../../redux/actions/index';
import Item from './item/item';
import ChatIcon from '@material-ui/icons/Chat';
import Auxi from '../../../helpers/Auxi/Auxi';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Login from '../../Authentication/Login/Login';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';

const Items = ({isAuthenticated, logout, showLogin, setShowLogin}) => {
    return (
        <div className = {classes.Items}>
            {
                isAuthenticated ?
                <Auxi>
                    <Item title="Chat">
                        <Tooltip title="Chat" className={classes.Tooltip}>
                            <NavLink 
                                activeClassName={classes.Active}
                                to='/'>
                                <ChatIcon className={[classes.Icon, classes.isActive].join(' ')}/>
                            </NavLink>
                        </Tooltip>
                    </Item>
                    <Item title="User">
                        <Tooltip title="User" className={classes.Tooltip}>
                            <NavLink 
                                activeClassName={classes.Active}
                                to='/user'>
                                <AccountCircleIcon className={[classes.Icon, classes.isActive].join(' ')}/>
                            </NavLink>
                        </Tooltip>
                    </Item>
                    <Item clicked = {logout} title="Log out">
                        <Tooltip title="Log out" className={classes.Tooltip}>
                            <NavLink 
                                activeClassName={classes.Active}
                                to="/logout">
                                <ExitToAppIcon className={[classes.Icon, classes.isActive].join(' ')}/>
                            </NavLink>
                        </Tooltip>
                    </Item>
                </Auxi>
                :
                <Auxi>
                    { showLogin ? <Login /> : null}
                    <Item clicked = {() => setShowLogin(true)}>
                        <NavLink 
                            activeClassName={classes.Active}
                            to='/login'>
                                <div className={classes.Item}>
                                    <p className={classes.MobileOnly}>LOG IN</p>
                                </div>
                        </NavLink>
                    </Item>
                    <Item clicked = {() => setShowLogin(false)}>
                        <NavLink 
                            activeClassName={classes.Active}
                            to="/signup">
                                <div className={classes.Item}>
                                    <p className={classes.MobileOnly}>SIGN UP</p>
                                </div>
                        </NavLink>
                    </Item>
                </Auxi>
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuth
    }
}

const mapDispatch = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout()),
        setShowLogin: (value) => dispatch(actions.showLogin(value)) 
    }
}

export default connect(mapState, mapDispatch)(Items);
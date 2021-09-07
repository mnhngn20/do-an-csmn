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

const Items = ({isAuthenticated, logout, showLogin}) => {
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
                    <Item>
                        <NavLink 
                            activeClassName={classes.Active}
                            to='/login'>
                            <p className={classes.MobileOnly}>LOG IN</p>
                        </NavLink>
                    </Item>
                    <Item>
                        <NavLink 
                            activeClassName={classes.Active}
                            to="/signup">
                            <p className={classes.MobileOnly}>SIGN UP</p>
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
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapState, mapDispatch)(Items);
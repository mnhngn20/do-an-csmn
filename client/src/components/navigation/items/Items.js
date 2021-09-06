import React from 'react';
import { connect } from 'react-redux'; 
import classes from './Items.module.css';

import { NavLink } from 'react-router-dom';
import Item from './item/item';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Login from '../../Authentication/Login/Login';
import Auxi from '../../../helpers/Auxi/Auxi';
const Items = ({isAuthenticated}) => {
    console.log(window.location.href)
    return (
        <div className = {classes.Items}>
            {
                isAuthenticated ?
                <Auxi>
                    <Item>
                        <NavLink 
                            activeClassName={classes.Active}
                            to='/'>
                            <ChatIcon className={[classes.Icon, classes.isActive].join(' ')}/>
                        </NavLink>
                    </Item>
                    <Item>
                        <NavLink 
                            activeClassName={classes.Active}
                            to="/signup">
                            <SupervisedUserCircleIcon className={[classes.Icon, classes.isActive].join(' ')}/>
                        </NavLink>
                    </Item>
                </Auxi>
                :
                <Login />
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuth
    }
}

export default connect(mapState, null)(Items);
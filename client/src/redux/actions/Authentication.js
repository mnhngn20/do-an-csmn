import axios from 'axios';
import * as actionTypes from './actionTypes';

const switchMode = (value) => {
    return {
        type: actionTypes.SHOW_LOGIN,
        value: value
    }
}

export const showLogin = (value) => {
    return dispatch => {
        dispatch(switchMode(value))
    }
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const regSuccess = () => {
    return {
        type: actionTypes.REG_SUCCESS
    }
}

const authSuccess = (accessToken, refreshToken, userId) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('refreshToken', refreshToken)
    return {
        type: actionTypes.AUTH_SUCCESS,
        accessToken: accessToken,
        userId: userId,
        isAuth: true
    }
}

export const register = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8800/auth/signup', data).then(res => {
            dispatch(regSuccess())
        }).catch( err => {
            dispatch(authFail(err))
        })
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('refreshToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8800/auth/login', data).then(res => {
            console.log(res);
            dispatch(authSuccess(res.data.accessToken, res.data.refreshToken, res.data.userId))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const autoSignIn = () => {
    return dispatch => {
        if(localStorage.getItem('refreshToken')){
            const reqPayload = {
                refreshToken: localStorage.getItem('refreshToken')
            }
            axios.post('http://localhost:8800/auth/gettoken', reqPayload).then(res => {
                console.log(res)
                dispatch(authSuccess(res.data.accessToken, res.data.refreshToken, res.data.userId));
                // dispatch(fetchUserProfile(res.data.user_id));
                // dispatch(fetchWatchList(res.data.user_id));
                // dispatch(checkAuthTimeout(res.data.expires_in))
            }).catch(err => {
                dispatch(authFail(err))
            })
        }
    }
}
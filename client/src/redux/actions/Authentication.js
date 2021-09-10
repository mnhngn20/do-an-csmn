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

const fetchUserData = (userData) => {
    return {
        type: actionTypes.FETCH_USER_DATA,
        userData: userData
    }
}

export const fetchUser = (response) => {
    return dispatch => {
        const config = {
            headers: {
                "x-access-token": response.data.accessToken
            }
        }
        axios.get('http://localhost:8800/users/user/'+ response.data.userId, config).then(res => {
            dispatch(fetchUserData(res.data))
            dispatch(authSuccess(response.data.accessToken, response.data.refreshToken, response.data.userId))
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const auth = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8800/auth/login', data).then(res => {
            console.log(res);
            dispatch(fetchUser(res))
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
                // dispatch(authSuccess(res.data.accessToken, res.data.refreshToken, res.data.userId));
                dispatch(fetchUser(res))
            }).catch(err => {
                dispatch(authFail(err))
            })
        }
    }
}
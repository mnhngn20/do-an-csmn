import axios from 'axios';
import * as actionTypes from './actionTypes';

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

const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
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

export const auth = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8800/auth/login', data).then(res => {
            console.log(res);

        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}

const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

const auth = () => {
    return dispatch => {
        dispatch(authStart)
    }
}
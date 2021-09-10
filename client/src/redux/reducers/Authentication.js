import { updateObject } from '../../helpers/ultility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isAuth: false,
    userId: null,
    userData: null,
    loading: false,
    error: null,
    showLogin: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        error: null,
        token: action.accessToken,
        loading: false,
        isAuth: action.isAuth
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        token: null,
        isAuth: false
    })
}

const regSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null
    })
}

const showLogin = (state, action) => {
    return updateObject(state,{
        showLogin: action.value
    })
}

const fetchUserData = (state, action) => {
    return updateObject(state, {
        userData: action.userData
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SHOW_LOGIN: return showLogin(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.REG_SUCCESS: return regSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.FETCH_USER_DATA: return fetchUserData(state, action);
        default: return state;
    }
}


export default reducer;



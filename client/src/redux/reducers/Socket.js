import { updateObject } from "../../helpers/ultility";
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    socket: null,
    onlineUsers: [],
    loading: false, 
    error: null
}

const setSocket = (state, action) => {
    return updateObject(state, {
        socket: action.socket
    })
}

const setOnlineUsers = (state, action) => {
    return updateObject(state, {
        onlineUsers: action.users,
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SOCKET: return setSocket(state, action);
        case actionTypes.SET_ONLINE_USERS: return setOnlineUsers(state, action);
        default: return state;
    }
}

export default reducer;
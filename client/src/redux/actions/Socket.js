import * as actionTypes from './actionTypes';

import { io } from "socket.io-client"

const setSocket = (socket) => {
    return {
        type: actionTypes.SET_SOCKET,
        socket: socket
    }
}

const setOnlineUsers = (users) => {
    return {
        type: actionTypes.SET_ONLINE_USERS,
        users: users
    }
}

export const connectToSocketServer = (userId) => {
    return dispatch => {
        const socket = io('ws://localhost:8900');
        dispatch(setSocket(socket));
        socket.emit("addUser", userId);
        socket.on("getUsers", users => {
            dispatch(setOnlineUsers(users))
        })
    }
}
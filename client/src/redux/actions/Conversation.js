import axios from 'axios';
import * as actionTypes from './actionTypes';

const fetchConversationStart = () => {
    return {
        type: actionTypes.FETCH_CONVERSATION_START
    }
}

const fetchConversationFail = (error) => {
    return {
        type: actionTypes.FETCH_CONVERSATION_FAIL,
        error: error
    }
}

const fetchConversationSuccess = (conversationId, receiverUser, messages) => {
    return {
        type: actionTypes.FETCH_CONVERSATION_SUCCESS,
        conversationId: conversationId,
        receiverUser: receiverUser,
        messages: messages
    }
}

const sendMessageStart = () => {
    return {
        type: actionTypes.SEND_MESSAGE_START
    }
}

const sendMessageSuccess = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        message: message
    }
}

const sendMessageFail = (err) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: err
    }
}

export const send = (conversationId, message, senderId) => {
    return dispatch => {
        dispatch(sendMessageStart())
        const data = {
            text: message,
            conversationId: conversationId,
            senderId: localStorage.getItem('userId')
        }
        const config = {
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:8800/messenger/message/sendmessage', data, config).then(res => {
            dispatch(sendMessageSuccess(res.data));
        }).catch(err => {
            dispatch(sendMessageFail(err))
        })
    }
}

export const getConversation = (friendId) => {
    return dispatch => {
        dispatch(fetchConversationStart())
        const data = {
            senderId: localStorage.getItem('userId'),
            receiverId: friendId,
        }
        const config = {
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:8800/messenger/newconversation', data, config).then(res => {
            axios.get('http://localhost:8800/messenger/conversation/'+ res.data.conversationId, config).then(res => {
                let receiverUser = null;
                for(let member of res.data.members){
                    if(member._id !== localStorage.getItem('userId')) receiverUser = member
                }
                dispatch(fetchConversationSuccess(res.data.conversationId, receiverUser, res.data.messages))
            })
        }).catch(err => {
            dispatch(fetchConversationFail(err))
        })
    }
}

const deleteConversationSuccess = () => {
    return {
        type: actionTypes.DELETE_SUCCESS
    }
}

export const deleteConversation = (conversationId) => {
    return dispatch => {
        dispatch(fetchConversationStart());
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('http://localhost:8800/messenger/conversation/delete-conversation/'+ conversationId, data).then(res => {
            dispatch(deleteConversationSuccess())
        }).catch(err => {
            dispatch(fetchConversationFail(err))
        })
    }
}
import { updateObject } from '../../helpers/ultility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    conversationId: null,
    senderUser: null,
    receiverUser: null,
    messages: [],
    loading: false,
    error: null,
    sendMessageLoading: false
}

const fetchConversationStart = (state, action) => {
    return updateObject(state, {
            loading: true
        })
}

const fetchConversationFail = (state, action) => {
    return updateObject(state, {
        loading: false, 
        error: action.error
    })
}

const fetchConversationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        conversationId: action.conversationId,
        receiverUser: action.receiverUser,
        error: null,
        messages: action.messages
    })
}

const sendMessageStart = (state, action) => {
    return updateObject(state, {
        sendMessageLoading: true
    })
}

const sendMessageSuccess = (state, action) => {
    const cloneMessage = [...state.messages];
    cloneMessage.push(action.message)
    return updateObject(state, {
        messages: cloneMessage,
        sendMessageLoading: false,
        error: null
    })
}

const appendNewMessage = (state, action) => {
    const cloneMessage = [...state.messages];
    cloneMessage.push(action.message)
    return updateObject(state, {
        messages: cloneMessage
    })
}

const sendMessageFail = (state, action) => {
    return updateObject(state, {
        sendMessageLoading: false,
        error: action.error
    })
}

const deleteSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        conversationId: null,
        messages: []
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CONVERSATION_START: return fetchConversationStart(state, action)
        case actionTypes.FETCH_CONVERSATION_FAIL: return fetchConversationFail(state, action)
        case actionTypes.FETCH_CONVERSATION_SUCCESS: return fetchConversationSuccess(state, action)
        case actionTypes.SEND_MESSAGE_START: return sendMessageStart(state, action)
        case actionTypes.SEND_MESSAGE_SUCCESS: return sendMessageSuccess(state, action)
        case actionTypes.SEND_MESSAGE_FAIL: return sendMessageFail(state, action)
        case actionTypes.DELETE_SUCCESS: return deleteSuccess(state, action)
        case actionTypes.APPEND_NEW_MESSAGE: return appendNewMessage(state, action)
        default: return state;
    }
}

export default reducer;
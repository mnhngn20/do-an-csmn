import { updateObject } from '../../helpers/ultility';
import * as actionTypes from '../actions/actionTypes';


const initialState = {
    conversationId: null,
    senderUser: null,
    receiverUser: null,
    messages: [],
    loading: false,
    error: null
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

const sendMessage = (state, action) => {
    const cloneMessage = [...state.messages];
    cloneMessage.push(action.message)
    return updateObject(state, {
        messages: cloneMessage
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CONVERSATION_START: return fetchConversationStart(state, action)
        case actionTypes.FETCH_CONVERSATION_FAIL: return fetchConversationFail(state, action)
        case actionTypes.FETCH_CONVERSATION_SUCCESS: return fetchConversationSuccess(state, action)
        case actionTypes.SEND_MESSAGE: return sendMessage(state, action)
        default: return state;
    }
}

export default reducer;
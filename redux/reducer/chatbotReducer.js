
export const chatbotActions = {
    SET_LIST_MESSAGE: 'CHATBOT.SET_LIST_MESSAGE',
    PUSH_ONE_ACTION: 'CHATBOT.PUSH_ONE_ACTION',
}

const initState = {
    listActions: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case chatbotActions.SET_LIST_MESSAGE:
            return {
                ...state,
                listActions: action.listActions
            }
        case chatbotActions.PUSH_ONE_ACTION:
            let listActionCopy = [...state.listActions]
            listActionCopy.push(action.action)
            return {
                ...state,
                listActions: listActionCopy
            }
        default: {
            return state
        }
    }
}

export default reducer
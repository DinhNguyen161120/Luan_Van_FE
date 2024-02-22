import { configureStore } from '@reduxjs/toolkit'
import headerReducer from './reducer/headerReducer'
import userReducer from './reducer/userReducer'
import graphReducer from './reducer/graphReducer'
import chatbotReducer from './reducer/chatbotReducer'

export default configureStore({
    reducer: {
        header: headerReducer,
        user: userReducer,
        graph: graphReducer,
        chatbot: chatbotReducer
    }
})

import axios from 'axios'

export const instanceChatbotRasa = axios.create({
    baseURL: 'http://localhost:5005',
    timeout: 100000
})


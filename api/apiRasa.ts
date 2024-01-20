
import { instanceChatbotRasa as axios } from "./axios.config";

export const sendMessageToChatbot = async (data) => {
    try {
        return await axios.post("/webhooks/rest/webhook", data);
    } catch (exception) {
        return {
            err: true,
            exception,
        };
    }
};
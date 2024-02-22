import { useSelector } from "react-redux"
import classes from "./MessageArea.module.scss"
import { MessageUser } from "./MessageUser"
import { MessageChatbot } from "./MessageChatbot"
import { useEffect } from "react"
export const MessageArea = () => {
    const listActions = useSelector((state: any) => state.chatbot.listActions)
    useEffect(() => {
        let MessageArea = document.getElementById('MessageArea')
        if (MessageArea) {
            MessageArea.scrollTop = MessageArea.scrollHeight
        }

    }, [listActions])
    return <div id="MessageArea" className={classes.MessageArea}>
        {
            listActions.map((action, index) => {
                if (action.sender === 'user') {
                    return <MessageUser key={index} message={action.message} />
                } else {
                    return <MessageChatbot key={index} messages={action?.message} />
                }
            })
        }
    </div>
}
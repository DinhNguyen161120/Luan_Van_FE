import Image from "next/image"
import classes from './index.module.scss'
import { useState } from "react"
import { Box, Button, Flex } from "@mantine/core"
import { IconSquareRoundedX, IconSend } from '@tabler/icons-react';
import { sendMessageToChatbot } from "../../api/apiRasa";
import { MessageArea } from "./MessageArea";
import { useDispatch, useSelector } from "react-redux";
import { chatbotActions } from '../../redux/reducer/chatbotReducer'
export const Chatbot = () => {
    const [showChat, setShowChat] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const dispatch = useDispatch()

    const toggle = () => {
        setShowChat(!showChat)
    }
    const handleChangeInput = (e) => {
        setMessage(e.target.value)
    }
    const handleSendMessage = async () => {
        let messageOfUser = {
            message: message,
            sender: 'user'
        }
        setMessage('')
        dispatch({
            type: chatbotActions.PUSH_ONE_ACTION,
            action: messageOfUser
        })

        const response: any = await sendMessageToChatbot(messageOfUser)
        if (response.error) {
            console.log('announce error')
        } else {
            if (response?.data) {
                let actionFromBot = {
                    sender: 'chatbot',
                    message: response?.data[0]?.custom?.metadata
                }
                dispatch({
                    type: chatbotActions.PUSH_ONE_ACTION,
                    action: actionFromBot
                })
            }
        }
    }

    const handleKeyDownInput = (e) => {
        if (e.keyCode === 13) {
            handleSendMessage()
        }
    }

    return <>
        <Box className={`${classes.ChatbotContainer} ${showChat && classes.bgWhite}`} >
            {
                showChat &&
                <div className={classes.chatContainer}>
                    <div className={classes.headerChat} style={{ display: 'flex', position: 'relative' }}>
                        <Box component="div" w={50} h={50} pos={'relative'}
                            style={{ borderRadius: '50%', overflow: 'hidden' }}
                        >
                            <Image src={'/icon_chat_bot.png'} alt="icon chat bot" fill />
                        </Box>
                        <div className={classes.chatbotName}>
                            <div>ChatBot</div>
                        </div>
                        <Box
                            style={{ position: "absolute", right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={toggle}
                        >
                            <IconSquareRoundedX />
                        </Box>
                    </div>

                    <div className={classes.messageArea}>
                        <MessageArea />
                    </div>

                    <Flex className={classes.inputContainer}>
                        <input value={message}
                            className={classes.inputText}
                            placeholder="your message"
                            onChange={handleChangeInput}
                            onKeyDown={handleKeyDownInput}
                        />
                        <Button onClick={handleSendMessage}>
                            <IconSend />
                        </Button>
                    </Flex>
                </div>
            }

            {
                !showChat &&
                <div className={classes.containerImageChatBot} onClick={toggle}>
                    <Image src={'/icon_chat_bot.png'} alt="icon chat bot" fill />
                </div>
            }
        </Box>
    </>
}

import classes from './MessageChatbot.module.scss'
import { Avatar, Box, Flex, Image } from '@mantine/core'

const DisplayText = ({ text }) => {
    return <div className={classes.displayText}>{text}</div>
}

const DisplayTextMiddle = ({ text }) => {
    return <div className={classes.displayTextMiddle}>{text}</div>
}
const DisplayUl = ({ listLis }) => {
    return <ul className={classes.messageUL}>
        {listLis.map((li, index) => {
            return <li key={index}>{li}</li>
        })}
    </ul>
}
const DisplayImage = ({ src }) => {
    return <Flex align={'center'} justify={'center'}>
        <div className={classes.containerImage}>
            <Image src={src} alt="Image chat" />
        </div>
    </Flex>
}



const DisplayTransitionFunction = ({ data }) => {
    return <div className={classes.containerTableTransition}>
        <table className={classes.cellTable}>
            <tr className={classes.cellTable}>
                <th className={classes.cellTable}>δ</th>
                <th className={classes.cellTable} colSpan={data[0].tr.length - 1}>Inputs</th>
            </tr>
            {
                data.map((trLists, index) => {

                    return <tr className={classes.cellTable} key={index}>
                        {
                            trLists.tr.map((tdContent, index) => {
                                return <td className={classes.cellTable} key={index}>
                                    {tdContent}
                                </td>
                            })
                        }
                    </tr>
                })
            }
        </table>
    </div>
}

export const MessageChatbot = ({ messages }) => {
    return <Box component='div' pt={10}>
        <Flex align={'center'} gap={10}>
            <Avatar src='/icon_chat_bot.png' size={'sm'} />
            Bot
        </Flex>
        {messages.map((message, index) => {
            if (message.type === 'text') {
                return <DisplayText key={index} text={message.data} />
            } else if (message.type === 'ul') {
                return <DisplayUl key={index} listLis={message.data} />
            } else if (message.type === 'image') {
                return <DisplayImage key={index} src={message.data} />
            } else if (message.type === 'tableTransition') {
                return <DisplayTransitionFunction key={index} data={message.data} />
            } else if (message.type === "textMiddle") {
                return <DisplayTextMiddle key={index} text={message.data} />
            }
        })}
    </Box>
}
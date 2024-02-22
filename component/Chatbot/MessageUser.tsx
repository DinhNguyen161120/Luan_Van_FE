
import { Avatar, Box, Flex } from '@mantine/core'
import classes from './MessageUser.module.scss'

export const MessageUser = ({ message }) => {
    return <Box component='div' pt={10}>
        <Flex align={'center'} gap={10}>
            <Avatar src='/bg2.png' size={'sm'} />
            You
        </Flex>
        {message}
    </Box>
}
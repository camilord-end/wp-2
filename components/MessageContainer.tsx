import Box from '@mui/material/Box'
import { MutableRefObject } from 'react'
import { scrollToBottom } from '../utils/scrollToBottom'
import { NextRouter } from 'next/router'
import { getMessagesSnap } from '../services/getMessagesSnap'
import { Message } from './Message'

export const MessageContainer = ({
  elem,
  router,
  messages
}: {
  elem: MutableRefObject<null>
  router: NextRouter
  messages: string
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [messagesSnap] = getMessagesSnap(router.query.id)
  const showMessages = () => {
    if (messagesSnap) {
      scrollToBottom(elem)
      return messagesSnap.docs.map((message) => {
        const messageData = { ...message.data() }
        const msg: string = messageData?.message
        const photoURL: string = messageData?.photoURL
        const user: string = messageData?.user
        return (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              message: msg,
              photoURL: photoURL,
              user: user,
              timestamp: message.data().timestamp?.toDate().getTime()
            }}
          />
        )
      })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return JSON.parse(messages).map((message: any) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  return (
    <Box
      id='message-container'
      sx={{
        p: '30px',
        minHeight: '75vh'
      }}
    >
      {showMessages()}
      <Box id='end-of-message' ref={elem}></Box>
    </Box>
  )
}

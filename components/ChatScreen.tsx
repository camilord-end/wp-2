import { HeaderIcons } from './HeaderIcons'
import { auth } from '../firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useRef } from 'react'
import { getRecipientEmail } from '../services/getRecipientEmail'
import { getRecipientSnap } from '../services/getRecipientSnap'
import TimeAgo from 'timeago-react'
import { ChatInput } from './ChatInput'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MessageContainer } from './MessageContainer'

export const ChatScreen = ({
  chat,
  messages
}: {
  chat: ChatTypes
  messages: string
}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const endOfMessagesRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const headerStyles = {
    position: 'sticky',
    backgroundColor: 'white',
    zIndex: '50',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid whitesmoke'
  }

  const recipientEmail = getRecipientEmail(chat.users, user)
  const recipient = getRecipientSnap(recipientEmail)

  return (
    <Box id='chat-screen-container'>
      <Box id='header' sx={headerStyles}>
        {recipient ? (
          <Image
            src={recipient?.photoUrl || ''}
            alt='contact-photo'
            width={50}
            height={50}
            style={{ borderRadius: '4px' }}
            referrerPolicy='no-referrer'
          />
        ) : null}
        <Box id='header-info' sx={{ ml: '15px', flex: '1' }}>
          <Typography variant='h6'>{recipientEmail}</Typography>
          {recipient ? (
            <Typography variant='caption'>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </Typography>
          ) : (
            <Typography variant='caption'>Unknown...</Typography>
          )}
        </Box>
        <HeaderIcons />
      </Box>
      <MessageContainer
        elem={endOfMessagesRef}
        messages={messages}
        router={router}
      />
      <ChatInput user={user} router={router} element={endOfMessagesRef} />
    </Box>
  )
}

interface ChatTypes {
  id: string
  users: string[]
}

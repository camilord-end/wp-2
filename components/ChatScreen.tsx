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
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'

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
  const { palette } = useTheme()
  const headerStyles = {
    position: 'sticky',
    zIndex: '50',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    background: palette.background.paper,
    borderBottom: `1px solid ${palette.divider}`
  }

  const recipientEmail = getRecipientEmail(chat.users, user)
  const recipient = getRecipientSnap(recipientEmail)

  return (
    <Box
      id='chat-screen-container'
      sx={{
        background: palette.background.default,
        color: palette.text.primary
      }}
    >
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
      <Divider />
      <MessageContainer
        elem={endOfMessagesRef}
        messages={messages}
        router={router}
      />
      <Divider />
      <ChatInput user={user} router={router} element={endOfMessagesRef} />
    </Box>
  )
}

interface ChatTypes {
  id: string
  users: string[]
}

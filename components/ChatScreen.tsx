import { Message } from './Message'
import { HeaderIcons } from './HeaderIcons'
import { getMessagesSnap } from '../services/getMessagesSnap'
import { auth, db } from '../firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import Box from '@mui/material/Box'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Mic from '@mui/icons-material/Mic'
import { useRef, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore'
import { getRecipientEmail } from '../services/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import TimeAgo from 'timeago-react'

export const ChatScreen = ({
  chat,
  messages
}: {
  chat: { id: string; users: string[] }
  messages: string
}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [messagesSnap] = getMessagesSnap(router.query.id)

  const scrollToBottom = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const showMessages = () => {
    if (messagesSnap) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = (e: any) => {
    e.preventDefault()
    setDoc(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      doc(db, 'users', user.uid),
      {
        lastSeen: serverTimestamp()
      },
      { merge: true }
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const msgRef = collection(doc(db, 'chats', router.query.id), 'messages')
    addDoc(msgRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user?.email,
      photoURL: user?.photoURL
    }).then(() => setInput(''))
    scrollToBottom()
  }

  const recipientEmail = getRecipientEmail(chat.users, user)
  const [recipientSnap] = useCollection(
    query(
      collection(db, 'users'),
      where('email', '==', getRecipientEmail(chat.users, user))
    )
  )

  const recipient = recipientSnap?.docs?.[0]?.data()

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
          {recipientSnap ? (
            <Typography variant='caption'>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </Typography>
          ) : (
            <Typography variant='caption'>Loading last active...</Typography>
          )}
        </Box>
        <HeaderIcons />
      </Box>
      <Box
        id='message-container'
        sx={{
          p: '30px',
          backgroundColor: '#e5ded8',
          minHeight: '75vh'
        }}
      >
        {showMessages()}
        <Box
          id='end-of-message'
          ref={endOfMessagesRef}
          sx={{ mb: '50px' }}
        ></Box>
      </Box>
      <Box
        id='input container'
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          position: 'static',
          bottom: '0',
          background: 'white',
          zIndex: '50'
        }}
      >
        <InsertEmoticon />
        <TextField
          variant='outlined'
          id='message-input'
          color='secondary'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            flex: '1',
            p: '5px',
            ml: '15px',
            mr: '15px'
          }}
        />
        <button
          hidden
          disabled={!input}
          type='submit'
          onClick={(e) => sendMessage(e)}
        >
          Send message
        </button>
        <Mic />
      </Box>
    </Box>
  )
}

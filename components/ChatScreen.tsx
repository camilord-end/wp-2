import { Message } from './Message'
import { HeaderIcons } from './HeaderIcons'
import { getMessagesSnap } from '../utils/getMessagesSnap'
import { auth, db } from '../firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import Box from '@mui/material/Box'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Mic from '@mui/icons-material/Mic'
import { useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [messagesSnap] = getMessagesSnap(router.query.id)

  const showMessages = () => {
    if (messagesSnap) {
      return messagesSnap.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } else {
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
  }

  return (
    <Box id='chat-screen-container'>
      <Box id='header' sx={headerStyles}>
        <Image
          src={user?.photoURL || ''}
          alt='contact-photo'
          width={50}
          height={50}
          style={{ borderRadius: '4px' }}
        />
        <Box id='header-info' sx={{ ml: '15px', flex: '1' }}>
          <Typography variant='h6'>Recipient Email</Typography>
          <Typography variant='caption' sx={{ fontSize: '14px' }}>
            Last Seen...
          </Typography>
        </Box>
        <HeaderIcons />
      </Box>
      <Box
        id='message-container'
        sx={{
          p: '30px',
          backgroundColor: '#e5ded8',
          minHeight: '72vh'
        }}
      >
        {showMessages()}
        <Box id='end-of-message'></Box>
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
            p: '20px',
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

import { MutableRefObject, useState } from 'react'
import { sendMessage } from '../services/sendMessage'
import { NextRouter } from 'next/router'
import { User } from 'firebase/auth'

import Box from '@mui/material/Box'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon'
import Mic from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField'

export const ChatInput = ({ user, router, element }: ChatInputTypes) => {
  const [input, setInput] = useState('')
  const inputStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    position: 'static',
    bottom: '0',
    background: 'white',
    zIndex: '50'
  }
  return (
    <Box
      id='input-container'
      component='form'
      noValidate
      autoComplete='off'
      sx={inputStyles}
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
        onClick={(e) => sendMessage(e, user, router, input, setInput, element)}
      >
        Send message
      </button>
      <Mic />
    </Box>
  )
}

interface ChatInputTypes {
  user: User | null | undefined
  router: NextRouter
  element: MutableRefObject<null>
}

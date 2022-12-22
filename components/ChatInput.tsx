import { MutableRefObject, useState } from 'react'
import { sendMessage } from '../services/sendMessage'
import { NextRouter } from 'next/router'
import { User } from 'firebase/auth'
import { useTheme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon'
import Mic from '@mui/icons-material/Mic'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

export const ChatInput = ({ user, router, element }: ChatInputTypes) => {
  const [input, setInput] = useState('')
  const { palette } = useTheme()
  const inputStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    position: 'static',
    bottom: '0',
    zIndex: '50',
    background: palette.background.paper
  }
  return (
    <Box
      id='input-container'
      component='form'
      noValidate
      autoComplete='off'
      sx={inputStyles}
    >
      <IconButton>
        <InsertEmoticon />
      </IconButton>
      <TextField
        variant='outlined'
        id='message-input'
        color='primary'
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
      <IconButton>
        <Mic />
      </IconButton>
    </Box>
  )
}

interface ChatInputTypes {
  user: User | null | undefined
  router: NextRouter
  element: MutableRefObject<null>
}

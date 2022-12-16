import Box from '@mui/material/Box'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Typography from '@mui/material/Typography'
import moment from 'moment'

interface MessageTypes {
  message: string
  photoURL: string
  timestamp: number
  user: string
}

export const Message = ({
  user,
  message
}: {
  user: unknown
  message: MessageTypes
}) => {
  const [userLoggedIn] = useAuthState(auth)

  const typeOfMessage = user === userLoggedIn?.email
  //true === sender
  //false ===reciever

  const sender = {
    width: 'fit-content',
    p: '15px',
    borderRadius: '5px',
    m: '5px',
    pb: '25px',
    minWidth: '60px',
    position: 'relative',
    textAlign: 'right',
    ml: 'auto',
    backgroundColor: '#dcf8c6'
  }
  const reciever = {
    width: 'fit-content',
    p: '15px',
    borderRadius: '5px',
    m: '5px',
    pb: '25px',
    minWidth: '60px',
    position: 'relative',
    backgroundColor: 'whitesmoke',
    textAlign: 'left'
  }

  const timeStampStyles = {
    color: 'gray',
    p: '10px',
    fontSize: '9px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    textAlign: 'left'
  }
  return (
    <Box>
      <Typography component='p' sx={typeOfMessage ? sender : reciever}>
        {message.message}
        <Typography component='span' sx={timeStampStyles}>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Typography>
      </Typography>
    </Box>
  )
}

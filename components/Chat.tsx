import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { getRecipientEmail } from '../services/getRecipientEmail'
import { getRecipientSnap } from '../services/getRecipientSnap'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

interface UserProps {
  id: string
  users: string[]
}

export const Chat = ({ id, users }: UserProps): JSX.Element => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)
  const recipient = getRecipientSnap(recipientEmail)

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const chatContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    p: '15px',
    wordBreak: 'break-word',
    '&:hover': {
      backgroundColor: '#e9eaeb'
    }
  }

  return (
    <Box sx={chatContainerStyles} onClick={enterChat}>
      {recipient ? (
        <Image
          style={{ margin: '5px', marginRight: '15px', borderRadius: '5px' }}
          alt='contact photo'
          src={recipient.photoUrl}
          width={40}
          height={40}
          referrerPolicy='no-referrer'
        />
      ) : (
        <Avatar sx={{ m: '5px', mr: '15px' }} variant='rounded' />
      )}

      <Box>
        {recipient ? (
          <Typography variant='body1'>{recipient.name}</Typography>
        ) : (
          <Typography variant='body1'>Unknown Name</Typography>
        )}
        <Typography variant='caption'>{recipientEmail}</Typography>
      </Box>
    </Box>
  )
}

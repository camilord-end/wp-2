import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { getRecipientEmail } from '../utils/getRecipientEmail'

interface UserProps {
  id: string
  users: string[]
}

export const Chat = ({ id, users }: UserProps): JSX.Element => {
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)
  const collectionRef = collection(db, 'users')
  const userQuery = query(collectionRef, where('email', '==', recipientEmail))
  const [recipientSnapShot] = useCollection(userQuery)
  const recipient = recipientSnapShot?.docs?.[0]?.data()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        p: '15px',
        wordBreak: 'break-word',
        '&:hover': {
          backgroundColor: '#e9eaeb'
        }
      }}
    >
      {recipient ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <Avatar
          sx={{ m: '5px', mr: '15px' }}
          src={recipient.photoUrl}
          referrerPolicy='no-referrer'
          variant='rounded'
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

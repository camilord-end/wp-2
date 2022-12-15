import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { collection, query, where } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

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
      onClick={enterChat}
    >
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

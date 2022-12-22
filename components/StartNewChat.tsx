import Button from '@mui/material/Button'
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { createChat } from '../services/createChat'

export const StartNewChat = () => {
  const [user] = useAuthState(auth)
  const collectionRef = collection(db, 'chats')
  const userQuery = query(
    collectionRef,
    where('users', 'array-contains', user?.email)
  )
  const [chatsSnapShot] = useCollection(userQuery)
  return (
    <Button
      variant='text'
      color='primary'
      onClick={() => createChat(chatsSnapShot, user, collectionRef)}
      sx={{ width: '100%' }}
    >
      Start a new Chat
    </Button>
  )
}

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ChatIcon from '@mui/icons-material/Chat'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import * as EmailValidator from 'email-validator'

import { auth, db } from '../firebase'
import {
  addDoc,
  CollectionReference,
  collection,
  query,
  where,
  DocumentData
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Chat } from './Chat'
import { chatAlreadyExist } from '../utils/chatAlreadyExist'

export const Sidebar = () => {
  const [user] = useAuthState(auth)
  const collectionRef = collection(db, 'chats')
  const userQuery = query(
    collectionRef,
    where('users', 'array-contains', user?.email)
  )
  const [chatsSnapShot] = useCollection(userQuery)

  const headerStyles = {
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1,
    padding: '15px',
    borderBottom: '1px solid whitesmoke'
  }
  const avatarStyles = { cursor: 'pointer', '&:hover': { opacity: 0.8 } }

  const createChat = (): void | null => {
    const input: string | null = prompt(
      'Please enter an email addres for the user to chat with: '
    )
    if (!input) return null
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input, chatsSnapShot) &&
      input !== user?.email
    ) {
      addChatToDB(collectionRef, {
        users: [user?.email, input]
      })
    }
  }

  const addChatToDB = async (
    newUserRef: CollectionReference<DocumentData>,
    data: unknown
  ) => {
    await addDoc(newUserRef, data)
  }

  return (
    <Box>
      <Box sx={headerStyles}>
        <Avatar
          sx={avatarStyles}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          src={user?.photoURL}
          referrerPolicy='no-referrer'
          onClick={() => auth.signOut()}
          variant='rounded'
        />
        <Box>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '10px' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id='input-search'
          label='Search in chats'
          variant='standard'
          sx={{ flex: 1 }}
        />
      </Box>
      <Button
        variant='text'
        color='success'
        onClick={createChat}
        sx={{ width: '100%' }}
      >
        Start a new Chat
      </Button>
      <Box>
        {chatsSnapShot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Box>
    </Box>
  )
}

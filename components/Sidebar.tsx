import { Chat } from './Chat'
import { SidebarHeaderButtons } from './SidebarHeaderButtons'
import { StartNewChat } from './StartNewChat'
import { auth, db } from '../firebase'

import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useTheme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

export const Sidebar = () => {
  const [user] = useAuthState(auth)
  const collectionRef = collection(db, 'chats')
  const userQuery = query(
    collectionRef,
    where('users', 'array-contains', user?.email)
  )
  const [chatsSnapShot] = useCollection(userQuery)
  const theme = useTheme()
  const headerStyles = {
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    zIndex: 1,
    padding: '15px',
    background: theme.palette.background.paper
  }
  const sidebarStyles = {
    flex: '0.45',
    height: '100vh',
    minWidth: '300px',
    maxWidth: '350px',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': { display: 'none' },
    background: theme.palette.background.default
  }
  const utilsStyles = {
    display: 'flex',
    alignItems: 'center',
    p: '10px',
    color: theme.palette.text.primary
  }
  return (
    <Box sx={sidebarStyles}>
      <Box sx={headerStyles}>
        <Image
          src={user?.photoURL ? user.photoURL : 'xd'}
          alt='user photo'
          width={50}
          height={50}
          priority
          style={{ cursor: 'pointer', borderRadius: '5px' }}
          referrerPolicy='no-referrer'
          onClick={() => auth.signOut()}
        />
        <Box>
          <SidebarHeaderButtons />
        </Box>
      </Box>
      <Divider />
      <Box sx={utilsStyles}>
        <SearchIcon sx={{ mr: 1, my: 0.5 }} />
        <TextField
          id='input-search'
          label='Search in chats'
          variant='outlined'
          sx={{ flex: 1 }}
        />
      </Box>
      <StartNewChat />
      <Box sx={{ color: theme.palette.text.primary }}>
        {chatsSnapShot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Box>
    </Box>
  )
}

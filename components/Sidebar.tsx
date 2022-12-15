import { SidebarHeaderButtons } from './SidebarHeaderButtons'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { auth, db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Chat } from './Chat'
import Image from 'next/image'
import { StartNewChat } from './StartNewChat'

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
  return (
    <Box
      sx={{
        flex: '0.45',
        borderRight: '1px solid whitesmoke',
        height: '100vh',
        minWidth: '300px',
        maxWidth: '350px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': { display: 'none' }
      }}
    >
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
      <Box sx={{ display: 'flex', alignItems: 'center', p: '10px' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id='input-search'
          label='Search in chats'
          variant='standard'
          sx={{ flex: 1 }}
        />
      </Box>
      <StartNewChat />
      <Box>
        {chatsSnapShot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Box>
    </Box>
  )
}

import { ChatScreen } from '../../components/ChatScreen'
import { Sidebar } from '../../components/Sidebar'
import { doc, getDoc, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import Box from '@mui/system/Box'
import Head from 'next/head'

const Chat = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <Box
        sx={{
          flex: '1',
          overflow: 'scroll',
          height: '100vh',
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none'
        }}
      >
        <ChatScreen />
      </Box>
    </Box>
  )
}
export default Chat

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  //
  const docRef = doc(db, 'chats', context.query.id)
  const docSnap = await getDoc(docRef)
  //
  //const messages = docSnap.docs
}

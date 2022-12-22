import { ChatScreen } from '../../components/ChatScreen'
import { Sidebar } from '../../components/Sidebar'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getRecipientEmail } from '../../services/getRecipientEmail'
import Box from '@mui/system/Box'
import Head from 'next/head'
import Divider from '@mui/material/Divider'

const Chat = ({
  chat,
  messages
}: {
  chat: { id: string; users: string[] }
  messages: string
}) => {
  const [user] = useAuthState(auth)

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <Divider orientation='vertical' flexItem />
      <Box
        sx={{
          flex: '1',
          overflow: 'scroll',
          height: '100vh',
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': { display: 'none' }
        }}
      >
        <ChatScreen chat={chat} messages={messages} />
      </Box>
    </Box>
  )
}
export default Chat

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  //
  const docRef = doc(db, 'chats', context.query.id)
  const msgRef = collection(docRef, 'messages')
  const q = query(msgRef, orderBy('timestamp', 'asc'))
  const docSnap = await getDocs(q)
  const messages = docSnap.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((messages: any) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))
  const chatSnap = await getDoc(docRef)
  const chat = {
    id: chatSnap.id,
    ...chatSnap.data()
  }
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

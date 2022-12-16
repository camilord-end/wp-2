import { collection, doc, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

export const getMessagesSnap = (id: string) => {
  const msgRef = collection(doc(db, 'chats', id), 'messages')
  const q = query(msgRef, orderBy('timestamp', 'asc'))
  const [messagesSnapshot] = useCollection(q)
  return [messagesSnapshot]
}

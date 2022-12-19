import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

export const getRecipientSnap = (recipientEmail: string) => {
  const collectionRef = collection(db, 'users')
  const userQuery = query(collectionRef, where('email', '==', recipientEmail))
  const [recipientSnapShot] = useCollection(userQuery)
  const recipient = recipientSnapShot?.docs?.[0]?.data()
  return recipient
}

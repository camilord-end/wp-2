/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { scrollToBottom } from '../utils/scrollToBottom'
import { db } from '../firebase'
import { User } from 'firebase/auth'
import { NextRouter } from 'next/router'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'

export const sendMessage = (
  e: any,
  user: User | null | undefined,
  router: NextRouter,
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  ref: MutableRefObject<null>
) => {
  e.preventDefault()
  setDoc(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    doc(db, 'users', user.uid),
    {
      lastSeen: serverTimestamp()
    },
    { merge: true }
  )
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const msgRef = collection(doc(db, 'chats', router.query.id), 'messages')
  addDoc(msgRef, {
    timestamp: serverTimestamp(),
    message: input,
    user: user?.email,
    photoURL: user?.photoURL
  })
    .then(() => setInput(''))
    .then(() => scrollToBottom(ref))
}

import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { auth, db } from '../firebase'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  DocumentData,
  DocumentReference
} from 'firebase/firestore'
import { Loading } from '../components/Loading'
import { Login } from './login'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [user, loading] = useAuthState(auth)
  useEffect(() => {
    if (user) {
      //todo
      setNewUser(doc(collection(db, 'users'), user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoUrl: user.photoURL,
        name: user.displayName
      })
    }
  }, [user])

  const setNewUser = async (
    newUserRef: DocumentReference<DocumentData>,
    data: unknown
  ): Promise<void> => {
    await setDoc(newUserRef, data)
  }

  if (loading) return <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default App

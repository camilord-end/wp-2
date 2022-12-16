import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Loading } from '../components/Loading'
import { Login } from './login'
import { auth, db } from '../firebase'
import { setNewUser } from '../services/setNewUser'
import { collection, doc, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setNewUser(doc(collection(db, 'users'), user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoUrl: user.photoURL,
        name: user.displayName
      })
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default App

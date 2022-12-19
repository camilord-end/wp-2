import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Loading } from '../components/Loading'
import Login from './login'
import { auth, db } from '../firebase'
import { setNewUser } from '../services/setNewUser'
import { collection, doc, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useMemo, useState } from 'react'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  useMediaQuery
} from '@mui/material'
import createEmotionCache from '../config/createEmotionCache'
import lightThemeOptions from '../config/lightThemeOptions'
import darkThemeOptions from '../config/darkThemeOptions'
import { ColorModeContext } from '../hooks/ColorModeContext'

const clientSideEmotionCache = createEmotionCache()
const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: MyAppProps): JSX.Element => {
  const [user, loading] = useAuthState(auth)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'dark' | 'light'>(
    prefersDarkMode ? 'dark' : 'light'
  )

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )
  const theme = useMemo(
    () => createTheme(mode === 'dark' ? darkThemeOptions : lightThemeOptions),
    [mode]
  )

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
  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  )
}

export default App

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

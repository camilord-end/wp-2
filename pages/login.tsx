import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Head from 'next/head'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

export const Login = (): JSX.Element => {
  const containerStyles = {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    backgroundColor: 'lightgray'
  }

  const loginCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: '100px',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid black'
  }

  const signIn = () => {
    //
    signInWithPopup(auth, provider).catch(alert)
  }
  return (
    <Box sx={containerStyles}>
      <Head>
        <title>Login</title>
        <meta
          name='description'
          content='This is the login page for the whatsapp clone'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={loginCardStyles}>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png'
          alt='whatsapp logo'
          width={200}
          height={200}
          priority
          style={{ marginBottom: '40px' }}
        />
        <Button onClick={signIn} variant='outlined' color='success'>
          Sign in with google
        </Button>
        <Typography variant='caption' color='green' sx={{ mt: '10px' }}>
          to start using the chat
        </Typography>
      </Box>
    </Box>
  )
}

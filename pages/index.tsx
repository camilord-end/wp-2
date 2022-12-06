import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <meta name='description' content='This is a whatsapp clone c:' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>
          <Sidebar />
        </div>
      </main>
    </>
  )
}

export default Home

import ClipLoader from 'react-spinners/ClipLoader'

export const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png'
          alt='whats app logo'
          height={200}
          style={{ marginBottom: 10 }}
        />
        <span>Loading 😊</span>
        <br />
        <ClipLoader color='#3CBC28' cssOverride={{}} />
      </div>
    </center>
  )
}

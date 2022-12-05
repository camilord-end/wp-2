import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ChatIcon from '@mui/icons-material/Chat'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

export const Sidebar = () => {
  const headerStyles = {
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1,
    padding: '15px',
    borderBottom: '1px solid whitesmoke'
  }

  return (
    <Box>
      <Box sx={headerStyles}>
        <Avatar sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }} />
        <Box>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '10px' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id='input-search'
          label='Search in chats'
          variant='standard'
          sx={{ flex: 1 }}
        />
      </Box>
      <Button variant='text' color='success' sx={{ width: '100%' }}>
        Start a new Chat
      </Button>
      {/* List of active chats */}
    </Box>
  )
}

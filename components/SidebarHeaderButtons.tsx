import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const SidebarHeaderButtons = () => {
  return (
    <Box>
      <IconButton>
        <ChatIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  )
}

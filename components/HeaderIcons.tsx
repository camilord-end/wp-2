import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttachFile from '@mui/icons-material/AttachFile'

export const HeaderIcons = () => {
  return (
    <Box id='header-icons'>
      <IconButton>
        <AttachFile />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  )
}

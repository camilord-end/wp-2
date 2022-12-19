import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../hooks/ColorModeContext'
import { useContext } from 'react'

export const SidebarHeaderButtons = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <MoreVertIcon /> : <ChatIcon />}
      </IconButton>
    </Box>
  )
}

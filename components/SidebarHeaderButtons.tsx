import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../hooks/ColorModeContext'
import { useContext } from 'react'

import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NightsStayIcon from '@mui/icons-material/NightsStay'

export const SidebarHeaderButtons = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <NightsStayIcon />
        )}
      </IconButton>
    </Box>
  )
}

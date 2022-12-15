import Box from '@mui/material/Box'

export const Message = ({ user, message }: { user: unknown; message: any }) => {
  return <Box>{message.message}</Box>
}

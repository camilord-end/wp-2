import { User } from 'firebase/auth'

export const getRecipientEmail = (
  users: string[],
  userLoggedIn: User | null | undefined
): string =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0]

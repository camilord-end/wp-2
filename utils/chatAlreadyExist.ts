import { DocumentData, QuerySnapshot } from 'firebase/firestore'

export const chatAlreadyExist = (
  recipientEmail: string,
  chatsSnapShot: QuerySnapshot<DocumentData> | undefined
): boolean =>
  !!chatsSnapShot?.docs.find(
    (chat) =>
      chat.data().users.find((user: unknown) => user === recipientEmail)
        ?.length > 0
  )

import * as EmailValidator from 'email-validator'
import { User } from 'firebase/auth'
import {
  CollectionReference,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore'
import { addChatToDB } from './addChatToDB'
import { chatAlreadyExist } from './chatAlreadyExist'

export const createChat = (
  chatsSnapShot: QuerySnapshot<DocumentData> | undefined,
  user: User | null | undefined,
  collectionRef: CollectionReference<DocumentData>
): void | null => {
  const input: string | null = prompt(
    'Please enter an email addres for the user to chat with: '
  )
  if (!input) return null
  if (
    EmailValidator.validate(input) &&
    !chatAlreadyExist(input, chatsSnapShot) &&
    input !== user?.email
  ) {
    addChatToDB(collectionRef, {
      users: [user?.email, input]
    })
  }
}

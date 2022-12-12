import { addDoc, CollectionReference, DocumentData } from 'firebase/firestore'

export const addChatToDB = async (
  newUserRef: CollectionReference<DocumentData>,
  data: unknown
) => {
  await addDoc(newUserRef, data)
}

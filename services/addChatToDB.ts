import { addDoc, CollectionReference, DocumentData } from 'firebase/firestore'

export const addChatToDB = async (
  newUserRef: CollectionReference<DocumentData>,
  data: unknown
): Promise<void> => {
  await addDoc(newUserRef, data)
}

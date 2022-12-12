import { setDoc, DocumentData, DocumentReference } from 'firebase/firestore'

export const setNewUser = async (
  newUserRef: DocumentReference<DocumentData>,
  data: unknown
): Promise<void> => {
  await setDoc(newUserRef, data)
}

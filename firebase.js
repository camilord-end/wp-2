/* eslint-disable no-undef */
// Imported functions from the SDKs
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// Firebase configuration

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const firebaseAppID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'wp-2-f7617.firebaseapp.com',
  projectId: 'wp-2-f7617',
  storageBucket: 'wp-2-f7617.appspot.com',
  messagingSenderId: '918146962937',
  appId: firebaseAppID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
auth.languageCode = 'it'
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  login_hint: 'user@example.com'
})

export { db, auth, provider }

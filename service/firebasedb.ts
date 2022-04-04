import { collection, getFirestore } from 'firebase/firestore'
import { firebaseapp } from './firebase'

export const db = getFirestore(firebaseapp)
export const todoCollection = collection(db, 'todos')

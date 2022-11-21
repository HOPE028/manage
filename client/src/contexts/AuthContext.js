import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentUserInformation, setCurrentUserInformation] = useState()
  const [loading, setLoading] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function getUserInformation(User) {
    const userRef = doc(db, 'Users', User.uid)
    const user = await getDoc(userRef)

    const userObject = {
      teamCode: user._document.data.value.mapValue.fields.classCode.stringValue,
      email: user._document.data.value.mapValue.fields.email.stringValue,
      role: user._document.data.value.mapValue.fields.role.stringValue,
    }
    setCurrentUserInformation(userObject)
  }

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser)
    getUserInformation(currentUser)
    setLoading(false)
  })

  const value = {
    currentUserInformation,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

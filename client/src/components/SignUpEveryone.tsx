import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { useAuth } from '../contexts/AuthContext'
import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore'

interface InterfaceSignUpEveryone {
  role: 'Manager' | 'Member'
}

export default function SignUpEveryone(props: InterfaceSignUpEveryone) {
  const { currentUser, currentUserInformation } = useAuth()

  const [originalFields, setOriginalFields] = useState()
  const [customFields, setCustomFields] = useState()

  useEffect(() => {
    console.log(currentUserInformation)

    if (currentUserInformation) {
      getData()
    }
  }, [])

  const getData = async () => {
    // const refOriginalFields = collection(
    //   db,
    //   'Class',
    //   currentUserInformation.teamCode,
    //   'Rules',
    //   'Information_Required',
    //   'Original'
    // )

    // const refCustomFields = collection(
    //   db,
    //   'Class',
    //   currentUserInformation.teamCode,
    //   'Rules',
    //   'Information_Required',
    //   'Custom'
    // )

    // const data = await getDocs(refOriginalFields)
    console.log('hello')

    // setOriginalFields(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  return (
    <div>
      <h1>Sign Up!</h1>
    </div>
  )
}

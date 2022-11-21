import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { useAuth } from '../contexts/AuthContext'
import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore'

interface InterfaceSignUpEveryone {
  role: 'Manager' | 'Member'
}

export default function SignUpEveryone(props: InterfaceSignUpEveryone) {
  const { currentUser, currentUserInformation } = useAuth()

  let any1: any
  any1 = {}
  let any2: any
  any2 = {}
  const [originalFields, setOriginalFields] = useState(any1)
  const [customFields, setCustomFields] = useState(any2)

  useEffect(() => {
    console.log(currentUserInformation)
    if (currentUserInformation) {
      getData()
    }
  }, [currentUser])

  const getData = async () => {
    const refOriginalFields = collection(
      db,
      'Class',
      currentUserInformation.teamCode,
      'Rules',
      'Information_Required',
      'Original'
    )

    const refCustomFields = collection(
      db,
      'Class',
      currentUserInformation.teamCode,
      'Rules',
      'Information_Required',
      'Custom'
    )

    const originalData = await getDocs(refOriginalFields)
    setOriginalFields(
      originalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )

    const customData = await getDocs(refOriginalFields)
    setOriginalFields(
      customData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }
  return (
    <div>
      <h1>Sign Up!</h1>
      {customFields.map((field) => {
        ;<div key={field.id}>
          <h2>{field.name}</h2>
        </div>
      })}
    </div>
  )
}

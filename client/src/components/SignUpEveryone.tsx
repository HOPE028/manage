import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { useAuth } from '../contexts/AuthContext'
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'

interface InterfaceSignUpEveryone {
  role: 'Manager' | 'Member'
}

interface InterfaceOriginalInformation {
  id: string
  label: string
  name: string
  value: boolean
  valueType: string
}

interface InterfaceCustomInformation {
  id: string
  name: string
  valueType: string
}

export default function SignUpEveryone(props: InterfaceSignUpEveryone) {
  const { currentUser, currentUserInformation } = useAuth()

  // let any1: InterfaceInformation
  // any1 = { id: 'random' }
  // let any2: InterfaceInformation
  // any2 = { id: 'random' }
  const [originalFields, setOriginalFields] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [customFields, setCustomFields] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])

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

    // console.log(JSON.stringify(info))

    setOriginalFields(
      originalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )

    const customData = await getDocs(refCustomFields)
    setCustomFields(
      customData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }
  return (
    <div>
      <h1>Sign Up!</h1>
      {/* <div>
        {customFields.map((field) => {
          ;<div key={field.id}>
            <h2>{field.name}</h2>
          </div>
        })}
      </div> */}
      <button onClick={() => console.log(customFields)}>DATA</button>
    </div>
  )
}

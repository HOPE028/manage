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
import { resourceLimits } from 'worker_threads'

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

  const [originalFields, setOriginalFields] = useState<
    InterfaceOriginalInformation[]
  >([])
  const [customFields, setCustomFields] = useState<
    InterfaceCustomInformation[]
  >([])

  useEffect(() => {
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

    let result: any = []

    result = originalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    await setOriginalFields(result)

    const customData = await getDocs(refCustomFields)

    result = customData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    await setCustomFields(result)
  }
  return (
    <div>
      {/* <h1>Sign Up!</h1> */}

      {customFields &&
        customFields.map((field) => {
          return (
            <div key={field.id}>
              <h3>{field.name}</h3>
            </div>
          )
        })}

      {originalFields &&
        originalFields.map((field) => {
          return (
            <div key={field.id}>
              <h3>{field.name}</h3>
            </div>
          )
        })}

      {/* <button onClick={() => console.log(originalFields)}>DATA</button> */}
    </div>
  )
}

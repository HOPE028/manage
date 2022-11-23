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

  // let any1: InterfaceInformation
  // any1 = { id: 'random' }
  // let any2: InterfaceInformation
  // any2 = { id: 'random' }
  const [originalFields, setOriginalFields] = useState<
    InterfaceOriginalInformation[]
  >([])
  const [customFields, setCustomFields] = useState<
    InterfaceCustomInformation[]
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

    let result: any = []
    // originalData.forEach((snapshot) => {
    //   result.push(snapshot)
    // })

    result = originalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    setOriginalFields(result)

    // setOriginalFields(
    //   originalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    // )

    const customData = await getDocs(refCustomFields)

    result = customData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    setCustomFields(result)
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

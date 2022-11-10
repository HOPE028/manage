import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'

import InformationFields from './InformationFields'
import PasswordAndEmail from './PasswordAndEmail'
import AccessFields from './AccessFields'
// import Informatio

export interface customFieldInterface {
  name: string
  valueType: string
}

export interface fieldInterface {
  name: string
  value: Boolean
  label: string
}

export default function SignUp() {
  const [page, setPage] = useState(2)
  return (
    <div>
      {page == 1 && <PasswordAndEmail />}
      {page == 2 && <ClassRules />}
    </div>
  )
}

function ClassRules() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [classPage, setClassPage] = useState(1)

  let firstExample: Array<customFieldInterface>

  firstExample = [{ name: '', valueType: 'Text' }]

  const [fields, setFields] = useState(firstExample)

  let secondExample: Array<fieldInterface>

  secondExample = [
    {
      name: 'Photos',
      label: 'Every Member can have a profile picture',
      value: false,
    },
    {
      name: 'Bio',
      label:
        'Every Member can have a biography section giving a short description of them',
      value: false,
    },
    {
      name: 'Nickname',
      label: 'Every member can have a nickname',
      value: false,
    },
  ]

  const [originalFields, setOriginalFields] = useState(secondExample)

  return (
    <div>
      <div>
        <h1>Class Settings</h1>
        {classPage == 1 && (
          <InformationFields
            originalFields={originalFields}
            setOriginalFields={setOriginalFields}
            fields={fields}
            setFields={setFields}
            classPage={classPage}
            setClassPage={setClassPage}
          />
        )}
        <button onClick={() => console.log(fields, originalFields)}>
          Data
        </button>
        {classPage == 2 && (
          <AccessFields
            originalFields={originalFields}
            setOriginalFields={setOriginalFields}
            fields={fields}
            setFields={setFields}
            classPage={classPage}
            setClassPage={setClassPage}
          />
        )}
      </div>
    </div>
  )
}

export interface InterfaceInformationFields {
  originalFields: Array<fieldInterface>
  setOriginalFields: Function
  fields: Array<customFieldInterface>
  setFields: Function
  classPage: number
  setClassPage: Function
}
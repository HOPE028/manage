import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'

import InformationFields from './InformationFields'
import PasswordAndEmail from './PasswordAndEmail'
import AccessFields from './AccessFields'
import TeamInformation from './TeamInformation'
import SignUpEveryone from '../SignUpEveryone'
// import Informatio

export interface customFieldInterface {
  name: string
  valueType: string
}

export interface fieldInterface {
  name: string
  value: Boolean
  label: string
  valueType: string
}

export default function SignUp() {
  const [page, setPage] = useState(1)
  return (
    <div>
      {page == 1 && <PasswordAndEmail page={page} setPage={setPage} />}
      {page == 2 && <ClassRules page={page} setPage={setPage} />}
      {page == 3 && <SignUpEveryone role='Manager' />}
    </div>
  )
}

export interface pageValues {
  page: number
  setPage: Function
}

function ClassRules(props: pageValues) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [classPage, setClassPage] = useState(1)
  const [teamName, setTeamName] = useState('')
  const [editInformation, setEditInformation] = useState(1)

  let customExample: Array<customFieldInterface>

  customExample = [{ name: '', valueType: 'Text' }]

  const [fields, setFields] = useState(customExample)

  let originalExample: Array<fieldInterface>

  originalExample = [
    {
      name: 'Photos',
      label: 'Every Member can have a profile picture',
      value: false,
      valueType: 'photos',
    },
    {
      name: 'Bio',
      label:
        'Every Member can have a biography section giving a short description of them',
      value: false,
      valueType: 'text',
    },
    {
      name: 'Nickname',
      label: 'Every member can have a nickname',
      value: false,
      valueType: 'text',
    },
  ]

  const [originalFields, setOriginalFields] = useState(originalExample)

  return (
    <div>
      <div>
        <h1>Class Settings</h1>
        {classPage == 1 && (
          <TeamInformation
            teamName={teamName}
            setTeamName={setTeamName}
            editInformation={editInformation}
            setEditInformation={setEditInformation}
            teamPage={classPage}
            setTeamPage={setClassPage}
          />
        )}
        {classPage == 2 && (
          <InformationFields
            originalFields={originalFields}
            setOriginalFields={setOriginalFields}
            fields={fields}
            setFields={setFields}
            classPage={classPage}
            setClassPage={setClassPage}
            page={props.page}
            setPage={props.setPage}
          />
        )}
        {classPage == 3 && (
          <AccessFields
            originalFields={originalFields}
            setOriginalFields={setOriginalFields}
            fields={fields}
            setFields={setFields}
            classPage={classPage}
            setClassPage={setClassPage}
            page={props.page}
            setPage={props.setPage}
            teamName={teamName}
            editInformation={editInformation}
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
  page: number
  setPage: Function
  teamName?: string
  editInformation?: number
}

import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import { InterfaceInformationFields } from './SignUp'
import { classCode } from './PasswordAndEmail'
import {
  exampleObject1,
  exampleObject2,
  exampleObject3,
  exampleObject4,
} from './ExampleObjects'

interface fieldChosen {
  name: string
  type: 'Custom' | 'Original'
}

export default function AccessFields(props: InterfaceInformationFields) {
  const [generalMember, setGeneralMember] = useState(exampleObject1)
  const [generalIndividual, setGeneralIndividual] = useState(exampleObject2)
  const [memberMember, setMemberMember] = useState(exampleObject3)
  const [memberIndividual, setMemberIndividual] = useState(exampleObject4)

  const [showGeneralIndividual, setShowGeneralIndividual] = useState(1)
  const [showMemberIndividual, setShowMemberIndividual] = useState(1)

  const { currentUser } = useAuth()

  const [classInformation, setClassInformation] = useState()

  useEffect(() => {
    console.log(currentUser.uid)

    const getData = async () => {}
    getData()
  }, [])

  const handleChange = (
    fields: Array<fieldChosen>,
    setFields: Function,
    name: string,
    type: 'Custom' | 'Original'
  ) => {
    let list = fields
    const i = fields.findIndex((field) => field.name === name)
    if (i > -1) {
      list.splice(i, 1)
      setFields(list)
    } else {
      let object: fieldChosen

      object = {
        name: name,
        type: type,
      }
      list.push(object)

      setFields(list)
    }
  }

  let inList = (fields: Array<fieldChosen>, name: string): Boolean => {
    console.log('here')
    if (fields.some((field) => field.name === name)) {
      return true
    }

    return false
  }

  const handleChangeShow = (
    group: 'General' | 'Member',
    value: number,
    setShow: Function
  ) => {
    setShow(value)
    if (group === 'Member' && value === 0 && showGeneralIndividual === 1) {
      setShowGeneralIndividual(0)
    } else if (
      group === 'General' &&
      value === 1 &&
      showMemberIndividual === 0
    ) {
      setShowMemberIndividual(1)
    }
  }

  const handlePageChange = async () => {
    // props.setClassPage(props.classPage + 1)
    try {
      console.log('here')

      const rulesCollectionRef = collection(db, 'Class', classCode, 'Rules')

      const docRef = doc(db, 'Class', classCode, 'Rules', 'General')

      await setDoc(docRef, {
        name: 'Rules',
        test: 'Yes',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Different Tiers Of Information Available</h3>
      <h3>On All Member Pages</h3>

      <h4>General</h4>

      <button onClick={() => console.log(generalMember)}>Data **</button>
      <DifferentAccessLevels
        originalFields={props.originalFields}
        setOriginalFields={props.setOriginalFields}
        fields={props.fields}
        setFields={props.setFields}
        classPage={props.classPage}
        setClassPage={props.setClassPage}
        selectedField={generalMember}
        setSelectedField={setGeneralMember}
        handleFieldChange={handleChange}
      />
      <h4>Member</h4>
      <DifferentAccessLevels
        originalFields={props.originalFields}
        setOriginalFields={props.setOriginalFields}
        fields={props.fields}
        setFields={props.setFields}
        classPage={props.classPage}
        setClassPage={props.setClassPage}
        selectedField={memberMember}
        setSelectedField={setMemberMember}
        handleFieldChange={handleChange}
      />

      <h3>On All Individual Pages</h3>

      <h4>General</h4>

      <input
        type='range'
        value={showGeneralIndividual}
        max={1}
        id='yes_or_no'
        onChange={(e) =>
          handleChangeShow(
            'General',
            Number(e.target.value),
            setShowGeneralIndividual
          )
        }
      />
      <DifferentAccessLevels
        originalFields={props.originalFields}
        setOriginalFields={props.setOriginalFields}
        fields={props.fields}
        setFields={props.setFields}
        classPage={props.classPage}
        setClassPage={props.setClassPage}
        selectedField={generalIndividual}
        setSelectedField={setGeneralIndividual}
        handleFieldChange={handleChange}
      />
      <h4>Member</h4>

      <input
        type='range'
        value={showMemberIndividual}
        max={1}
        id='yes_or_no'
        onChange={(e) =>
          handleChangeShow(
            'Member',
            Number(e.target.value),
            setShowMemberIndividual
          )
        }
      />

      <DifferentAccessLevels
        originalFields={props.originalFields}
        setOriginalFields={props.setOriginalFields}
        fields={props.fields}
        setFields={props.setFields}
        classPage={props.classPage}
        setClassPage={props.setClassPage}
        selectedField={memberIndividual}
        setSelectedField={setMemberIndividual}
        handleFieldChange={handleChange}
      />

      <button
        onClick={() =>
          console.log(
            generalMember,
            generalIndividual,
            memberMember,
            memberIndividual
          )
        }
      >
        Data
      </button>

      <button onClick={() => handlePageChange()}>Next</button>
    </div>
  )
}

interface InterfaceInformationFieldsPlus extends InterfaceInformationFields {
  selectedField: Array<fieldChosen>
  setSelectedField: Function
  handleFieldChange: Function
}

function DifferentAccessLevels(props: InterfaceInformationFieldsPlus) {
  return (
    <div style={{ border: 'black solid 5px' }}>
      {props.fields
        .filter((field) => {
          return field.name !== ''
        })
        .map((field, index) => {
          let add = true
          return (
            <div key={index}>
              {field.name}
              <button
                onClick={() =>
                  props.handleFieldChange(
                    props.selectedField,
                    props.setSelectedField,
                    field.name,
                    'Custom'
                  )
                }
              >
                Add
              </button>
            </div>
          )
        })}
      {props.originalFields
        .filter((field) => {
          return field.value === true
        })
        .map((field, index) => {
          return (
            <div key={index}>
              {field.name}
              <button
                onClick={() =>
                  props.handleFieldChange(
                    props.selectedField,
                    props.setSelectedField,
                    field.name,
                    'Original'
                  )
                }
              >
                Add
              </button>
            </div>
          )
        })}
    </div>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import { InterfaceInformationFields } from './SignUp'
import {
  exampleObject1,
  exampleObject2,
  exampleObject3,
  exampleObject4,
  fieldChosen,
} from './ExampleObjects'

export default function AccessFields(props: InterfaceInformationFields) {
  const [generalMember, setGeneralMember] = useState(exampleObject1)
  const [generalIndividual, setGeneralIndividual] = useState(exampleObject2)
  const [memberMember, setMemberMember] = useState(exampleObject3)
  const [memberIndividual, setMemberIndividual] = useState(exampleObject4)

  const [showGeneralIndividual, setShowGeneralIndividual] = useState(1)
  const [showMemberIndividual, setShowMemberIndividual] = useState(1)

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

  return (
    <div>
      <h3>Different Tiers Of Information Available</h3>
      <h3>On All Member Pages</h3>
      <h4>General</h4>
      <button onClick={() => console.log()}>Help me</button>
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
        page={props.page}
        setPage={props.setPage}
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
        page={props.page}
        setPage={props.setPage}
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
        page={props.page}
        setPage={props.setPage}
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
        page={props.page}
        setPage={props.setPage}
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

      <NextPage
        memberMember={memberMember}
        memberIndividual={memberIndividual}
        generalIndividual={generalIndividual}
        generalMember={generalMember}
        classPage={props.classPage}
        setClassPage={props.setClassPage}
        fields={props.fields}
        originalFields={props.originalFields}
        setFields={props.setFields}
        setOriginalFields={props.setOriginalFields}
        showGeneralIndividual={showGeneralIndividual}
        showMemberIndividual={showMemberIndividual}
        page={props.page}
        setPage={props.setPage}
      />
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

interface dataToUploadToDatabase extends InterfaceInformationFields {
  generalMember: Array<fieldChosen>
  memberMember: Array<fieldChosen>
  generalIndividual: Array<fieldChosen>
  memberIndividual: Array<fieldChosen>
  showGeneralIndividual: number
  showMemberIndividual: number
}

function NextPage(props: dataToUploadToDatabase) {
  const { currentUser } = useAuth()

  const [userInformation, setUserInformation] = useState({
    classCode: 'false',
    email: 'false',
    role: 'false',
  })

  useEffect(() => {
    const getData = async () => {
      const userRef = doc(db, 'Users', currentUser.uid)
      const user: any = await getDoc(userRef)

      console.log(user)

      const userObject = {
        classCode:
          user._document.data.value.mapValue.fields.classCode.stringValue,
        email: user._document.data.value.mapValue.fields.email.stringValue,
        role: user._document.data.value.mapValue.fields.role.stringValue,
      }
      setUserInformation(userObject)
    }
    getData()
  }, [])

  const handlePageChange = async () => {
    if (userInformation.classCode === 'false') {
      console.log('here?')
      return
    }

    console.log('and here?')

    try {
      // const rulesCollectionRef = collection(
      //   db,
      //   'Class',
      //   userInformation.classCode,
      //   'Rules'
      // )

      //Information Required
      // -> Custom

      const customFieldsRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'Information_Required',
        'Custom'
      )

      props.fields.forEach((field) => {
        addDoc(customFieldsRef, {
          name: field.name,
          valueType: field.valueType,
        })
      })

      // -> General

      const originalFieldsRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'Information_Required',
        'Original'
      )

      props.originalFields.forEach((field) => {
        addDoc(originalFieldsRef, {
          name: field.name,
          value: field.value,
          label: field.label,
          valueType: field.valueType,
        })
      })

      //General
      // -> Member

      const generalMemberRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'General',
        'Member'
      )

      props.generalMember.forEach((field) => {
        addDoc(generalMemberRef, {
          name: field.name,
          type: field.type,
        })
      })
      // -> Individual

      const generalIndividualRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'General',
        'Individual'
      )

      props.generalIndividual.forEach((field) => {
        addDoc(generalIndividualRef, {
          name: field.name,
          type: field.type,
        })
      })

      const showGeneralIndividualRef = doc(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'General',
        'Individual',
        'Show'
      )

      const showGeneralIndividual =
        props.showGeneralIndividual === 1 ? true : false

      setDoc(showGeneralIndividualRef, {
        Show: showGeneralIndividual,
      })

      //Member
      // -> Member

      const memberMemberRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'Member',
        'Member'
      )

      props.memberMember.forEach((field) => {
        addDoc(memberMemberRef, {
          name: field.name,
          type: field.type,
        })
      })

      // -> Individual

      const memberIndividualRef = collection(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'Member',
        'Individual'
      )

      props.memberIndividual.forEach((field) => {
        addDoc(memberIndividualRef, {
          name: field.name,
          type: field.type,
        })
      })

      const showMemberIndividualRef = doc(
        db,
        'Class',
        userInformation.classCode,
        'Rules',
        'Member',
        'Individual',
        'Show'
      )

      const showMemberIndividual =
        props.showMemberIndividual === 1 ? true : false

      setDoc(showMemberIndividualRef, {
        Show: showMemberIndividual,
      })

      props.setPage(props.page + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={() => handlePageChange()}>Next</button>
    </div>
  )
}

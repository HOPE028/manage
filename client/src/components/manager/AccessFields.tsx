import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import { InterfaceInformationFields } from './SignUp'

export default function AccessFields(props: InterfaceInformationFields) {
  interface fieldChosen {
    name: string
    type: 'Custom' | 'Original'
  }

  let exampleObject1: Array<fieldChosen>
  let exampleObject2: Array<fieldChosen>
  let exampleObject3: Array<fieldChosen>
  let exampleObject4: Array<fieldChosen>

  exampleObject1 = [
    {
      name: '',
      type: 'Custom',
    },
  ]

  exampleObject2 = [
    {
      name: '',
      type: 'Custom',
    },
  ]

  exampleObject3 = [
    {
      name: '',
      type: 'Custom',
    },
  ]

  exampleObject4 = [
    {
      name: '',
      type: 'Custom',
    },
  ]

  const [generalMember, setGeneralMember] = useState(exampleObject1)
  const [generalIndividual, setGeneralIndividual] = useState(exampleObject2)
  const [memberMember, setMemberMember] = useState(exampleObject3)
  const [memberIndividual, setMemberIndividual] = useState(exampleObject4)

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
    // if (fields.some((field) => field.name === name)) {
    //   return true
    // }

    if (fields.includes({ name: 'abcd', type: 'Custom' })) {
      console.log('Found')
    }

    return false
  }

  return (
    <div>
      <h3>Different Tiers Of Information Available</h3>
      <h5>On All Member Page</h5>

      <h6>General</h6>
      <div style={{ border: 'black solid 5px' }}>
        {props.fields
          .filter((field) => {
            return field.name !== ''
          })
          .map((field, index) => {
            return (
              <div key={index}>
                {field.name}
                <button
                  onClick={() =>
                    handleChange(
                      generalMember,
                      setGeneralMember,
                      field.name,
                      'Custom'
                    )
                  }
                >
                  {`${
                    generalMember.includes({ name: field.name, type: 'Custom' })
                      ? 'Remove'
                      : 'Add'
                  }`}
                </button>
                <button onClick={() => inList(generalMember, 'Custom')}>
                  See
                </button>
              </div>
            )
          })}
        {props.originalFields
          .filter((field) => {
            return field.value === true
          })
          .map((field, index) => {
            const added = inList(generalMember, field.name)

            return (
              <div key={index}>
                {field.name}
                <button
                  onClick={() =>
                    handleChange(
                      generalMember,
                      setGeneralMember,
                      field.name,
                      'Original'
                    )
                  }
                >
                  {`${added ? 'Remove' : 'Add'}`}
                </button>
              </div>
            )
          })}
      </div>
      <button onClick={() => console.log(generalMember)}>Data **</button>
    </div>
  )
}

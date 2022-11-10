import React, { useState, useEffect } from 'react'
import { InterfaceInformationFields } from './SignUp'

export default function InformationFields(props: InterfaceInformationFields) {
  const [error, setError] = useState('')

  const handleDelete = (index: number) => {
    const list = [...props.fields]
    list.splice(index, 1)
    props.setFields(list)
  }

  const handleEditField = (value: string, name: string, index: number) => {
    const list = [...props.fields]
    let object = list[index]
    object = {
      ...object,
      [name]: value,
    }
    list[index] = object
    props.setFields(list)
  }

  const addField = () => {
    if (empty(props.fields)) {
      setError('Please Fill Out All Previous Fields Before Creating A New One')
      return
    }

    let list = [...props.fields]
    list.push({ name: '', valueType: 'Text' })
    props.setFields(list)
    setError('')
  }

  const empty = (fields: Array<any>): Boolean => {
    for (let a = 0; a < fields.length; a++) {
      const object = fields[a]
      if (object.name === '') return true
    }

    return false
  }

  return (
    <div>
      <h4 style={{ color: 'red' }}>{error}</h4>
      <h3>Class Information Gathered</h3>
      <p>Name will be automatically required...</p>
      {props.fields.map((field, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <input
              name='name'
              type='text'
              placeholder='Field Name..'
              value={field.name}
              onChange={(e) =>
                handleEditField(e.target.value, e.target.name, index)
              }
            />
            {/* <h4>{field.valueType}</h4> */}
            <select
              value={field.valueType}
              name='valueType'
              onChange={(e) =>
                handleEditField(e.target.value, e.target.name, index)
              }
            >
              <option value='Text'>Text</option>
              <option value='Number'>Number</option>
              <option value='Yes-Or-No'>Yes-Or-No</option>
            </select>

            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        )
      })}
      <button onClick={addField}>Another</button>

      <button onClick={() => console.log(props.fields)}>Data</button>

      {props.originalFields.map((field, index) => {
        let valueTranslated = field.value == true ? 1 : 0

        const handleChange = (value: number) => {
          let valueTranslated = field.value == true ? false : true

          const list = [...props.originalFields]
          let object = list[index]
          object = {
            ...object,
            value: valueTranslated,
          }

          list[index] = object
          props.setOriginalFields(list)
        }

        return (
          <div key={index}>
            <p>{field.name}</p>
            <input
              type='range'
              value={valueTranslated}
              max={1}
              id='yes_or_no'
              onChange={(e) => handleChange(Number(e.target.value))}
            />
          </div>
        )
      })}

      <button onClick={() => props.setClassPage(props.classPage + 1)}>
        Next
      </button>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import { map } from '@firebase/util'

export const classCode = randomNumberGenerator(9)

export default function PasswordAndEmail() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const usersCollectionRef = collection(db, 'Users')
  const { signup, currentUser } = useAuth()
  let navigate = useNavigate()

  const handleClick = async () => {
    if (!validSubmission()) return

    try {
      setLoading(true)
      let newSubmission = await signup(email, password)
      let submission = newSubmission.user

      const docRef = doc(db, 'Users', submission.uid)

      await setDoc(docRef, {
        role: 'Manager',
        email: email,
        classCode: classCode,
      })

      const docRef_class = doc(db, 'Class', classCode)

      await setDoc(docRef_class, {
        size: 0,
      })

      const docRef_users = collection(db, 'Class', classCode, 'Users')

      await addDoc(docRef_users, {
        fake: true,
      })

      // Members

      // const docRef_Members = doc(db, 'Class', classCode, 'Users', 'Members')

      // await setDoc(docRef_Members, {
      //   size: 0,
      // })

      // const newCollectionRef_Member = collection(
      //   db,
      //   'Class',
      //   classCode,
      //   'Users',
      //   'Members',
      //   'People'
      // )

      // await addDoc(newCollectionRef_Member, {
      //   fake: true,
      // })

      // // Manager

      // const docRef_Manager = doc(db, 'Class', classCode, 'Users', 'Manager')

      // await setDoc(docRef_Manager, {
      //   size: 0,
      // })

      // const newCollectionRef_Manager = collection(
      //   db,
      //   'Class',
      //   classCode,
      //   'Users',
      //   'Manager',
      //   'People'
      // )

      // await addDoc(newCollectionRef_Manager, {
      //   fake: true,
      // })

      // navigate('')
    } catch (error) {
      console.log(error)
      setError('Failed To Create An Account')
    }
    setLoading(false)
  }

  const validSubmission = () => {
    setError('')

    //Inputs are filled
    if (email === '' || password === '' || passwordConfirmation === '') {
      return setError('Please Fill In All Input Fields')
    }

    //Email is valid.
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return setError('Invalid Email')
    }

    //Passwords match each other.
    if (password !== passwordConfirmation) {
      return setError('Passwords Do Not Match')
    }

    return true
  }

  return (
    <div>
      <div className='flex-container space-from-top'>
        <div className='login-content'>
          <h2>Manager Sign Up</h2>
          {currentUser && currentUser.email}
          {error === '' ? '' : <h3 className='error'>{error}</h3>}
          <h4>Email:</h4>
          <input
            type='email'
            onChange={(event) => setEmail(event.target.value)}
          />
          <h4>Password:</h4>
          <input
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <h4>Password Confirmation:</h4>
          <input
            type='password'
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <button
            onClick={handleClick}
            type='submit'
            className={loading ? 'disabled' : ''}
          >
            Sign Up
          </button>
        </div>
        <h4 className='link'>
          Already have an account? <Link to='/login'>Log In</Link>
        </h4>
      </div>
    </div>
  )
}

function randomNumberGenerator(n: number): string {
  var add = 1,
    max = 12 - add // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return randomNumberGenerator(max) + randomNumberGenerator(n - max)
  }

  max = Math.pow(10, n + add)
  var min = max / 10 // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min

  return ('' + number).substring(add)
}

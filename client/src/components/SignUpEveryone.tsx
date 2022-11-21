import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { useAuth } from '../contexts/AuthContext'

interface InterfaceSignUpEveryone {
  role: 'Manager' | 'Member'
}

export default function SignUpEveryone(props: InterfaceSignUpEveryone) {
  const { currentUserInformation } = useAuth()
  return (
    <div>
      <h1>Sign Up!</h1>
      <button onClick={() => console.log(currentUserInformation)}>Yes</button>
    </div>
  )
}

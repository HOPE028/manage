import React, { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/manager/SignUp'
import { isYieldExpression } from 'typescript'

function App() {
  const { currentUser } = useAuth()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

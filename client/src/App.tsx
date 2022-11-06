import React, { useState, useEffect } from 'react'

function App() {
  useEffect(() => {
    const receiveInfo = async () => {
      const response = await fetch('/something')
      const responseTwo = await fetch('/here')
    }
    receiveInfo()
    console.log('Hello')
  }, [])

  return <div className='App'></div>
}

export default App

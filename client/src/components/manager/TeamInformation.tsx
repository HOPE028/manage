import React, { useState, useEffect } from 'react'

interface interfaceTeamInformation {
  teamName: string
  setTeamName: Function
  editInformation: number
  setEditInformation: Function
  teamPage: number
  setTeamPage: Function
}

export default function TeamInformation(props: interfaceTeamInformation) {
  const handleNextPage = () => {
    props.setTeamPage(props.teamPage + 1)
  }

  return (
    <div>
      <h3>Team Name</h3>
      <input
        type='text'
        value={props.teamName}
        onChange={(e) => props.setTeamName(e.target.value)}
      />

      <h3>Can A User Edit Information Later On?</h3>
      <input
        type='range'
        max={1}
        value={props.editInformation}
        onChange={(e) => Number(props.setEditInformation(e.target.value))}
      />

      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

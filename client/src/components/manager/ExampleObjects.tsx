import React, { useState, useEffect } from 'react'

export interface fieldChosen {
  name: string
  type: 'Custom' | 'Original'
}

export let exampleObject1: Array<fieldChosen>
export let exampleObject2: Array<fieldChosen>
export let exampleObject3: Array<fieldChosen>
export let exampleObject4: Array<fieldChosen>

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

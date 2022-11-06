const express = require('express')
const app = express()

app.get('/something', (req, res) => {
  console.log('hello')
  res.json({ answer: 'Yes' })
})

app.get('/here', (req, res) => {
  console.log('Slay')
  res.json({ Word: 'Slay' })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('HELLO')
})

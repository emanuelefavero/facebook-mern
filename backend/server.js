require('dotenv').config()
const express = require('express')

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

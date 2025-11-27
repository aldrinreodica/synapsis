import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './config/db.ts'

const PORT = process.env.PORT || 3001

const app = express()
dotenv.config()

// Connect to the database
dbConnect()

// App setup
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`)
})

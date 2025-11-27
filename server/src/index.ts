import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './config/db'
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'
import userRoutes from './routes/user.routes'

const PORT = process.env.PORT || 3001

const app = express()
dotenv.config()

// Connect to the database
dbConnect()

// App setup
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`)
})

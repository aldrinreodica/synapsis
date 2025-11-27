import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const dbConnect = async (): Promise<void> => {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables')
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || '')
    console.log('Database connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

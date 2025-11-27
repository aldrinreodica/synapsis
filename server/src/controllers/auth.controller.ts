import { Request, Response } from 'express'
import { signToken } from '../utils/jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'

export const signUp = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser)
    return res
      .status(400)
      .json({ message: 'User with that email already exists' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ username, email, password: hashedPassword })

  const token = signToken(user._id.toString())

  res.status(201).json({ user, token })
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' })

  const token = signToken(user._id.toString())

  res.status(200).json({ user, token })
}

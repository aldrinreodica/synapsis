import { Request, Response } from 'express'
import User from '../models/user.model'
import { AuthRequest } from '../middlewares/auth.middleware'
import bcrypt from 'bcryptjs'

export const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find()
  res.status(200).json({ users })
}

export const getUserById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json({ user })
}

export const createUser = async (req: AuthRequest, res: Response) => {
  const { username, email, password, role } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser)
    return res
      .status(400)
      .json({ message: 'User with that email already exists' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  })

  res.status(201).json({ user })
}

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const { username, email, password } = req.body

  const user = await User.findByIdAndUpdate(
    id,
    { username, email, password },
    { new: true }
  )

  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json({ user })
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json({ message: 'User deleted successfully' })
}

import { Request, Response } from 'express'
import { signToken } from '../utils/jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'

export const signUp = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    console.log({ id: 'signup-error', email, success: false })
    return res.status(200).json({
      error: 'email',
      message: 'Account already exists',
      success: false,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ username, email, password: hashedPassword })

  const token = signToken(user._id.toString())

  console.log({ id: 'signup-success', user, success: true })
  res.status(201).json({ success: true, user, token })
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    console.log({ id: 'signin-error', email, success: false })
    return res.status(200).json({
      error: 'email',
      message: 'Account does not exist.',
      success: false,
    })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    console.log({ id: 'signin-error', userId: user._id, success: false })
    return res.status(200).json({
      error: 'password',
      message: 'Password is incorrect.',
      success: false,
    })
  }

  const token = signToken(user._id.toString())

  console.log({ id: 'signin-success', user, success: true })
  res.status(200).json({ success: true, user, token })
}

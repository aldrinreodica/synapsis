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

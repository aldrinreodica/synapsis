import { Document } from 'mongoose'

export interface IUser {
  name: String
  email: String
  password: String
  role: 'user' | 'admin' | 'superadmin'
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends IUserDocument {}

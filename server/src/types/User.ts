import { Document, Model } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  role: 'user' | 'admin' | 'superadmin'
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

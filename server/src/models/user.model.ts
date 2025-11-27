import { Schema, model } from 'mongoose'
import { IUserDocument, IUserModel } from '../types/User.js'

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

const User = model<IUserDocument, IUserModel>('User', UserSchema)

export default User

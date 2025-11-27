import { Schema, model } from 'mongoose'
import { IUserDocument } from '../types/User'

const UserSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      maxLength: 50,
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

const User = model<IUserDocument>('User', UserSchema)

export default User

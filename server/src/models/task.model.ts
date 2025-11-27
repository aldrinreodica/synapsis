import { model, Schema } from 'mongoose'
import { IUserDocument, IUserModel } from '../types/User.js'

const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Task = model<IUserDocument, IUserModel>('Task', TaskSchema)

export default Task

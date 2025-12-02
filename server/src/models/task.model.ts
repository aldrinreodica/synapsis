import { model, Schema } from 'mongoose'
import { ITaskDocument, TaskLabelEnum, TaskStatusEnum } from '../types/Task'

const TaskSchema = new Schema(
  {
    // User reference
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
      enum: TaskStatusEnum,
    },
    label: {
      type: String,
      enum: TaskLabelEnum,
    },
  },
  {
    timestamps: true,
  }
)

TaskSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})
TaskSchema.virtual('columnId').get(function () {
  return this.status
})

TaskSchema.set('toObject', { virtuals: true })
TaskSchema.set('toJSON', { virtuals: true })

const Task = model<ITaskDocument>('Task', TaskSchema)

export default Task

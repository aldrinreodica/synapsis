import { Document, Model } from 'mongoose'

export interface ITask {
  userId: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  createdAt?: Date
  updatedAt?: Date
}

export interface ITaskDocument extends ITask, Document {}

export interface ITaskModel extends Model<ITaskDocument> {}

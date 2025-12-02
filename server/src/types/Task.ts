import { Document, Model } from 'mongoose'

export enum TaskLabelEnum {
  'personal' = 'Personal',
  'health' = 'Health & Wellness',
  'finance' = 'Finance',
  'home' = 'Home',
  'work' = 'Work',
  'meeting' = 'Meeting',
  'planning' = 'Planning',
  'review' = 'Review',
  'urgent' = 'Urgent',
  'important' = 'Important',
  'later' = 'Do Later',
}

export enum TaskStatusEnum {
  'todo' = 'todo',
  'doing' = 'doing',
  'done' = 'done',
  'cancelled' = 'cancelled',
}

export interface ITask {
  userId: string
  title: string
  description?: string
  status: TaskStatusEnum
  label: TaskLabelEnum
  createdAt?: Date
  updatedAt?: Date
}

export interface ITaskDocument extends ITask, Document {}

export interface ITaskModel extends Model<ITaskDocument> {}

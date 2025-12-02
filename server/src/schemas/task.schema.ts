import { z } from 'zod'
import { TaskLabelEnum, TaskStatusEnum } from '../types/Task'

export const createTaskSchema = z.object({
  userId: z.string().length(24, 'Invalid user ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(TaskStatusEnum),
  label: z.enum(TaskLabelEnum),
})

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(TaskStatusEnum).optional(),
  label: z.enum(TaskLabelEnum).optional(),
  columnId: z.enum(TaskStatusEnum).optional(),
})

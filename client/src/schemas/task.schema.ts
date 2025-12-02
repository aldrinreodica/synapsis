import { labelsData } from '@/data/labels'
import { z } from 'zod'

export const TaskColumnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Title must contain at least 2 characters.' })
    .max(50, { message: 'Title must contain at most 50 characters.' }),
})

export const ItemTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Title must contain at least 2 characters.' })
    .max(50, { message: 'Title must contain at most 50 characters.' }),
  description: z
    .string()
    .trim()
    .min(2, { message: 'Description must contain at least 2 characters.' })
    .max(250, { message: 'Description must contain at most 250 characters.' })
    .optional(),
  label: z.custom<string>(
    (value) => labelsData.some((label) => label.name === value),
    { message: 'Invalid label. Please select a valid label.' }
  ),
})

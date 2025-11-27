import z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin', 'superadmin']).default('user'),
})

export const updateUserSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.email('Invalid email address').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
  role: z.enum(['user', 'admin', 'superadmin']).optional(),
})

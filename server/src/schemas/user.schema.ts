import z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['user', 'admin', 'superadmin']),
})

export const updateUserSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.email('Invalid email address').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .optional(),
  role: z.enum(['user', 'admin', 'superadmin']).optional(),
})

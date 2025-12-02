import z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(6, {
    message: 'Username must be at least 6 characters.',
  }),
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['user', 'admin', 'superadmin']).optional(),
})

export type AddUserValues = z.infer<typeof createUserSchema>

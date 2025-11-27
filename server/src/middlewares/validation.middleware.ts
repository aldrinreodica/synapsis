import { Request, Response, NextFunction } from 'express'
import { z, ZodObject } from 'zod'

export const validateBody =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        }))

        return res.status(400).json({
          status: 'error',
          message: 'Validation failed for request body',
          errors: errorMessages,
        })
      }

      next(error)
    }
  }

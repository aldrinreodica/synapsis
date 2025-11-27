import express from 'express'
import { signIn, signUp } from '../controllers/auth.controller'
import { validateBody } from '../middlewares/validation.middleware'
import { signInSchema } from '../schemas/auth.schema'
import { createUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.post('/signup', validateBody(createUserSchema), signUp)
router.post('/signin', validateBody(signInSchema), signIn)

export default router

import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.controller'
import { validateBody } from '../middlewares/validation.middleware'
import { createUserSchema, updateUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/create', validateBody(createUserSchema), createUser)
router.put('/update/:id', validateBody(updateUserSchema), updateUser)
router.delete('/delete/:id', deleteUser)

export default router

import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/task.controller'
import { validateBody } from '../middlewares/validation.middleware'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getTasks)
router.post('/create', validateBody(createTaskSchema), createTask)
router.put('/update/:id', validateBody(updateTaskSchema), updateTask)
router.delete('/delete/:id', deleteTask)

export default router

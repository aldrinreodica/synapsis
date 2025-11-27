import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware'
import Task from '../models/task.model'

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ userId: req.user!.userId })
  res.status(200).json({ tasks })
}

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body
  const task = await Task.create({
    title,
    description,
    status: 'pending',
    userId: req.user!.userId,
  })
  res.status(201).json({ task })
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const { title, description, status } = req.body

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user!.userId },
    { title, description, status },
    { new: true }
  )

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  res.status(200).json({ task })
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params

  const task = await Task.findOneAndDelete({
    _id: id,
    userId: req.user!.userId,
  })

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  res.status(200).json({ message: 'Task deleted successfully' })
}

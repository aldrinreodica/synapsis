import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware'
import Task from '../models/task.model'

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ userId: req.user!.userId }).populate('user')

  console.log({ id: 'get-tasks', success: true })
  res.status(200).json({ tasks, success: true })
}

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status, label } = req.body
  const task = await Task.create({
    title,
    description,
    status,
    label,
    userId: req.user!.userId,
  }).then((createdTask) => createdTask.populate('user'))

  console.log({ id: 'create-task-success', task, success: true })
  res.status(201).json({ task, success: true })
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const { title, description, status, label } = req.body

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user!.userId },
    { title, description, status, label },
    { new: true }
  )

  if (!task) {
    console.log({ id: 'update-task-error', task, success: false })
    return res.status(404).json({ message: 'Task not found' })
  }

  console.log({ id: 'update-task-success', task, success: true })
  res.status(200).json({ task, success: true })
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params

  const task = await Task.findOneAndDelete({
    _id: id,
    userId: req.user!.userId,
  })

  if (!task) {
    console.log({ id: 'delete-task-error', task, success: false })
    return res.status(404).json({ message: 'Task not found' })
  }

  console.log({ id: 'delete-task-success', task, success: true })
  res
    .status(200)
    .json({ task, success: true, message: 'Task deleted successfully' })
}

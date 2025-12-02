import { api } from '@/lib/api'
import { ICreateTask, ITask, IUpdateTask, TaskStatusEnum } from '@/types/tasks'

interface IUpdateParams extends IUpdateTask {
  id: string
}

interface IUpdateStatus {
  id: string
  status: TaskStatusEnum
}

export const getTasks = async () => {
  const res = await api.get('/tasks')
  return res.data.tasks
}

export const createTask = async (params: ICreateTask) => {
  const res = await api.post('/tasks/create', params)
  return res.data
}

export const updateTask = async (params: IUpdateParams) => {
  const { id, ...data } = params
  const res = await api.put(`/tasks/update/${id}`, data)
  return res.data
}

export const updateTaskByStatus = async (params: IUpdateStatus) => {
  const { id, ...data } = params
  const res = await api.put(`/tasks/update/${id}/status`, data)
  return res.data
}

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/delete/${id}`)
  return res.data
}

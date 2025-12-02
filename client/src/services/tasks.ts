import { api } from '@/lib/api'
import { ICreateTask, ITask, IUpdateTask } from '@/types/tasks'

interface IUpdateParams extends IUpdateTask {
  id: string
}

export const getTasks = async () => {
  const res = await api.get('/tasks')
  return res.data.tasks
}

export const createTask = async (data: ICreateTask) => {
  const res = await api.post('/tasks/create', data)
  return res.data
}

export const updateTask = async (params: IUpdateParams) => {
  const { id, ...data } = params
  const res = await api.put(`/tasks/update/${id}`, data)
  return res.data
}

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/delete/${id}`)
  return res.data
}

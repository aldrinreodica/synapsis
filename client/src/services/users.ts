import { api } from '@/lib/api'
import { ICreateUser } from '@/types/tasks'

export const getUsers = async (
  role: string | undefined,
  roleFilter: string | undefined
) => {
  let url = '/users'

  if (roleFilter) {
    let roles = roleFilter
    const tempRoles = roleFilter.split(',')
    if (role === 'admin' && tempRoles.includes('superadmin'))
      roles = tempRoles.filter((role) => role !== 'superadmin').join(',')
    url += `?roles=${roleFilter}`
  }

  const res = await api.get(url)
  return res.data
}

export const createUser = async (params: ICreateUser) => {
  const res = await api.post('/users/create', params)
  return res.data
}
